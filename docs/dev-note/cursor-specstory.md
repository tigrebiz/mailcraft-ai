<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

#

---

# Cursor 拡張機能 SpecStory に関するメモ

## SpecStory の概要

SpecStory は、Cursor エディタ（Visual Studio Code の派生エディタ）専用の拡張機能で、AI アシスタントとの対話を効率的に記録・活用するために開発されたツールです。この拡張機能は、AI との会話履歴や Composer セッション（コード自動生成や差分提案）を自動的に保存する機能を提供します。

### 主要機能

- **AI チャット履歴の自動保存**: すべてのチャットやコード生成が`.specstory`ディレクトリに Markdown 形式で自動記録される
- **Composer セッション追跡**: Cursor 独自の Composer 機能の履歴も追跡可能
- **検索性の向上**: Markdown 形式で保存されるため、プロジェクト内検索機能や全文検索が容易
- **ローカル保存によるセキュリティ確保**: AI とのやり取りデータは`.specstory`ディレクトリ配下にローカルで保存
- **共有機能**: コマンドパレットから会話履歴を share.specstory.com を通じて共有可能
- **実験的機能**: チャット履歴から Cursor ルールを自動生成する機能も提供

## .specstory ディレクトリの保存場所

### 基本的な保存場所

.specstory ディレクトリは、Cursor で開いているプロジェクトのルートディレクトリに作成されます。ディレクトリ構造は以下のようになります：

```
my-project/
├── .specstory/
│   └── history/
│       ├── untitled-1.md
│       └── untitled.md
└── README.md
```

### devcontainer 環境での挙動

複数の devcontainer を使用するモノレポ環境（例：フロントエンドとバックエンドを分離）では、各ディレクトリごとに独立した SpecStory ディレクトリが作成されます。

例えば、以下のような構造の場合：

```
my-project/
├── frontend/
│   └── .devcontainer
├── backend/
│   └── .devcontainer
```

3 つの異なる Cursor エディタウィンドウで開発を行うと（my-project、frontend、backend）、それぞれのディレクトリに個別の`.specstory`ディレクトリが作成され、別々に管理されます：

```
my-project/
├── frontend/
│   ├── .devcontainer/
│   └── .specstory/
├── backend/
│   ├── .devcontainer/
│   └── .specstory/
└── .specstory/ （my-project全体を開いた場合）
```

この場合、各 devcontainer を開く際に、そのコンテナ内のルートディレクトリに`.specstory`ディレクトリが個別に作成され、それぞれのコンテキストに沿った会話履歴が保存されます。これにより、フロントエンド開発とバックエンド開発で異なる会話コンテキストを維持できます。

## .specstory ディレクトリの Git 管理

.specstory ディレクトリは GitHub にアップロードして Git でバージョン管理することが可能です。

### Git 管理の利点

- **検索性の向上**: GitHub の検索機能で過去の AI 会話を簡単に検索可能
- **完全な履歴追跡**: 特定時点での会話状態を完全に復元できる
- **チーム共有の容易さ**: チームメンバー間で AI との会話履歴を簡単に共有できる

### 実装方法

1. 通常の Git リポジトリと同様に初期化とリモート設定を行う
2. .specstory ディレクトリを含むプロジェクトファイルをコミット
3. GitHub などのリモートリポジトリにプッシュ

### プライバシーとセキュリティの考慮事項

- 秘密鍵やパスワードなどの機密情報が AI との会話に含まれていないか確認する
- 必要に応じてプライベートリポジトリを使用する
- GitHub にアップロードしたくない特定のファイルは.gitignore に追加する

## インストール方法

1. 最新版の Cursor がインストールされていることを確認
2. 公式サイトから VSIX ファイル（specstory-vscode-latest.vsix）をダウンロード
   ※注意: VS Code マーケットプレイスからは直接インストールできない
3. Cursor を起動し、コマンドパレット（Windows/Linux は Ctrl+Shift+P、Mac は Cmd+Shift+P）を開く
4. `Extensions: Install from VSIX…`を選択し、ダウンロードした VSIX ファイルを指定
5. インストール完了後、Cursor を再起動
6. 拡張機能サイドバーで「SpecStory (Cursor Extension)」が表示されていることを確認

インストール後は特別な設定をしなくても、Cursor でチャットや Composer を使用した際の履歴が自動的に保存されるようになります。

## まとめ

SpecStory は、AI との協働をより効果的に行うための革新的な拡張機能です。会話履歴の自動保存、検索可能なナレッジベースの構築、チーム内での知見共有など、様々な機能によって開発効率を大幅に向上させることができます。

プロジェクトの構成や devcontainer 環境に応じて適切に.specstory ディレクトリが作成され、必要に応じて Git 管理することで、AI との対話を貴重な資産として活用することが可能になります。
