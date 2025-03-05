# Next.js ホットリロード設定ガイド

## 目次

1. [ホットリロードの基本概念](#ホットリロードの基本概念)
2. [Next.jsのデフォルトホットリロード機能](#nextjsのデフォルトホットリロード機能)
3. [Docker環境でのホットリロード設定](#docker環境でのホットリロード設定)
   - [OSによる挙動の違い](#osによる挙動の違い)
   - [Docker ComposeとVolumeの設定](#docker-composeとvolumeの設定)
   - [Next.jsの設定（webpackDevMiddleware）](#nextjsの設定webpackdevmiddleware)
4. [ホットリロードのトラブルシューティング](#ホットリロードのトラブルシューティング)
5. [パフォーマンス最適化](#パフォーマンス最適化)
6. [参考リソース](#参考リソース)

## ホットリロードの基本概念

ホットリロード（Hot Reload）またはホットモジュールリプレースメント（HMR）は、コードの変更を検出し、アプリケーション全体を再起動せずに変更されたモジュールのみを置き換える機能です。この機能により、以下の利点があります：

- 開発の効率が向上する
- アプリケーションの状態が保持される
- 変更をリアルタイムで確認できる
- 変更が即座に反映されるため、開発サイクルが短縮される

## Next.jsのデフォルトホットリロード機能

Next.jsは開発モードでデフォルトでホットリロード機能を提供しています。`package.json`の`dev`スクリプトを実行すると自動的に有効になります：

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

通常の環境（Dockerを使用しない場合）では、`npm run dev`を実行するだけで、ファイルの変更が自動的に検出され、ブラウザに反映されます。

## Docker環境でのホットリロード設定

Dockerコンテナ内でNext.jsを実行する場合、標準のファイル変更検出システムは正常に機能しないことがあります。これは、Dockerがホストマシンとコンテナ間でファイルシステムをマウントする方法に起因します。

### OSによる挙動の違い

ホットリロードの挙動はホストOSによって大きく異なることがあります：

- **macOS**：基本設定でもホットリロードが正常に動作することが多い
- **Windows**：ファイルシステムの違いにより、追加設定なしではホットリロードが動作しないことが多い
- **Linux**：環境によって挙動が異なる場合がある

特に、最適化設定を行う前は、macOSでは問題なくホットリロードが機能していたにもかかわらず、Windowsでは全く機能しないという現象が観察されています。これはWindowsとLinuxコンテナ間のファイルシステム連携の方法に起因しています。

### Docker ComposeとVolumeの設定

Docker Composeファイル（`docker-compose.yml`）で適切なボリュームマウントを設定することが重要です：

```yaml
services:
  frontend:
    build: 
      context: .
      dockerfile: ./frontend/.devcontainer/Dockerfile
    volumes:
      - .:/workspace:cached  # ホストのファイルシステムをコンテナにマウント
      - frontend_node_modules:/workspace/frontend/node_modules  # node_modulesは別ボリュームとして管理
    # その他の設定...

volumes:
  frontend_node_modules:  # node_modulesのための永続ボリューム
```

この設定では：
- ホストのファイルシステムがコンテナの`/workspace`ディレクトリにマウントされます
- `node_modules`は別のボリュームとして管理され、ホストのファイルシステムとの競合を防ぎます
- `:cached`フラグはパフォーマンスを向上させるためのものです

### Next.jsの設定（webpackDevMiddleware）

Next.jsの設定ファイル（`next.config.mjs`または`next.config.js`）に以下の設定を追加して、Docker環境でのホットリロードを最適化します：

```javascript
// next.config.mjs
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Dockerでのホットリロードを最適化
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,        // 1秒ごとにファイル変更をチェック
      aggregateTimeout: 300,  // 変更検出後300msの間隔を開けてからリビルド開始
    }
    return config
  },
};

export default nextConfig;
```

この設定の重要なパラメータ：

- **`poll: 1000`**: ファイル変更の検出方法をポーリング方式に変更し、1秒（1000ミリ秒）ごとにファイルの変更をチェックします。
- **`aggregateTimeout: 300`**: ファイル変更が検出されてから実際にリビルドが開始されるまでの待機時間を300ミリ秒に設定します。これにより、短時間に複数のファイル変更があった場合でも、リビルドは一度だけ実行されます。

## ホットリロードのトラブルシューティング

ホットリロードが正常に機能しない場合のトラブルシューティング手順：

1. **Next.jsの設定を確認する**：`next.config.mjs`に`webpackDevMiddleware`の設定が正しく追加されているか確認します。

2. **Docker Composeのボリューム設定を確認する**：ボリュームが正しくマウントされているか確認します。

3. **Node.jsのバージョンを確認する**：互換性の問題を避けるため、コンテナとホストのNode.jsバージョンの互換性を確認します。

4. **ログを確認する**：Next.jsの開発サーバーのログを確認し、エラーや警告がないか確認します。

5. **再起動する**：問題が解決しない場合は、コンテナを再起動してみてください。
   ```bash
   docker-compose down && docker-compose up -d
   ```

6. **キャッシュをクリアする**：Next.jsのキャッシュをクリアします。
   ```bash
   rm -rf frontend/.next
   ```

## パフォーマンス最適化

ホットリロードのパフォーマンスを最適化するためのヒント：

1. **`poll`の値調整**：CPUリソースとリアクティブ性のバランスを考慮して調整します。
   - 値を小さくすると（例：500ms）反応が良くなりますが、CPU使用率が上がります。
   - 値を大きくすると（例：2000ms）CPU使用率は下がりますが、反応が遅くなります。

2. **`aggregateTimeout`の値調整**：ファイル変更の頻度に応じて調整します。
   - 頻繁に変更する場合は、値を大きくして不要なリビルドを減らします。
   - 変更が少ない場合は、値を小さくして即座に反映されるようにします。

3. **ボリュームマウントの最適化**：`:cached`や`:delegated`などのフラグを使用して、ファイルシステムのパフォーマンスを向上させます。

## 参考リソース

- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [Webpack DevServer ドキュメント](https://webpack.js.org/configuration/dev-server/)
- [Docker ボリューム マウントのパフォーマンス](https://docs.docker.com/storage/volumes/)
- [Docker ComposeでのNode.js開発環境のベストプラクティス](https://docs.docker.com/compose/production/) 