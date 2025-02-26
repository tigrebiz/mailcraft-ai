# MailCraft AI

ビジネスメール最適化アシスタント「MailCraft AI」- プロフェッショナルなビジネスメールを簡単に作成できるウェブアプリケーション

## 概要

MailCraft AIは、ビジネスメールの内容を入力するだけで、AI技術を活用して適切な形式や表現に自動変換し、プロフェッショナルなビジネスメールを簡単に作成できるウェブアプリケーションです。

### 主な機能

- **メール内容入力**: ユーザーが伝えたい内容を入力するテキストエリア
- **メール生成**: 入力内容をAIが適切なビジネスメール形式に変換
- **丁寧さレベル調整**: カジュアルから非常に丁寧まで、複数段階での調整機能
- **コピー機能**: ワンクリックでクリップボードにコピーできる機能
- **宛先情報管理**: 取引先名や氏名を保存し、添削後のメールヘッダーに簡単に挿入できる機能

## 開発環境のセットアップ

### 前提条件

- [Docker](https://www.docker.com/get-started)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Remote Development拡張機能](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

### 開発環境の構築手順

1. リポジトリをクローン
   ```bash
   git clone https://github.com/tigrebiz/mailcraft-ai.git
   cd mailcraft-ai
   ```

2. VS Codeで開く
   ```bash
   code .
   ```

3. Remote-Containers拡張機能を使用して開発コンテナ内で開く
   - VS Code左下の「><」アイコンをクリックし、「コンテナーで開く」を選択
   - または、コマンドパレット(F1)で「Remote-Containers: Open Folder in Container」を実行

4. 開発サーバーの起動
   ```bash
   npm run dev
   ```
   
5. ブラウザで http://localhost:3000 にアクセス

## 技術スタック

- **フロントエンド**: Next.js, React, TypeScript, Tailwind CSS
- **バックエンド**: Firebase (初期段階), 将来的にはMongoDB Atlasへの移行も検討
- **AI統合**: OpenAI API

## プロジェクト構造

```
mailcraft-ai/
├── src/
│   ├── components/     # 再利用可能なUIコンポーネント
│   ├── pages/          # ページコンポーネント
│   ├── styles/         # グローバルスタイル
│   ├── utils/          # ユーティリティ関数
│   ├── services/       # APIサービス
│   ├── hooks/          # カスタムReact Hooks
│   └── context/        # Reactコンテキスト
├── public/             # 静的ファイル
└── .devcontainer/      # 開発環境設定
```

## ライセンス

このプロジェクトは[MITライセンス](LICENSE)の下で公開されています。
