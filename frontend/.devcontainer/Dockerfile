FROM node:18

# 必要なツールのインストール
RUN apt-get update && \
    apt-get install -y git curl wget gnupg nano vim && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# グローバルパッケージのインストール
RUN npm install -g next typescript ts-node 

WORKDIR /workspace/frontend

# 作業ディレクトリの所有権をnodeユーザに設定
RUN mkdir -p /workspace/frontend/node_modules && \
    chown -R node:node /workspace && \
    chmod -R 775 /workspace

USER node

# コンテナ内での実行コマンド
CMD ["sleep", "infinity"] 