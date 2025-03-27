FROM node:18-slim

# 必要最小限のツールのみインストール
RUN apt-get update && \
    apt-get install -y git curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 作業ディレクトリの作成と権限設定
RUN mkdir -p /workspace/frontend && \
    chown -R node:node /workspace && \
    chmod -R 755 /workspace

WORKDIR /workspace/frontend

# package.jsonとpackage-lock.jsonをコピー
COPY --chown=node:node frontend/package*.json ./

# nodeユーザーに切り替え
USER node

# 依存関係をインストール（グローバルインストールを避け、プロジェクトの依存関係として管理）
RUN npm install

# コンテナ内での実行コマンド
CMD ["sleep", "infinity"] 