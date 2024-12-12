# ベースイメージの設定
FROM --platform=linux/amd64 node:18-alpine AS base
RUN apk add --no-cache openssl

# 作業ディレクトリの設定
WORKDIR /web

# package.jsonとyarn.lockをコピー
COPY package.json ./

# 必要な依存関係をインストール
RUN npm install

# prismaのファイルをコピー
COPY prisma ./prisma/

# ソースコードをコピー
COPY . .
# 実際のデータベースの接続情報を設定
ENV NODE_ENV=production

# Next.jsのビルドを実行
RUN npm run build

# 実行環境のイメージを構築
FROM --platform=linux/amd64 node:18-alpine AS production

# 作業ディレクトリの設定
WORKDIR /web

# 依存関係をコピー
COPY --from=base /web/node_modules ./node_modules

# ビルド成果物と必要なファイルをコピー
COPY --from=base /web/.next ./.next
COPY --from=base /web/public ./public
COPY --from=base /web/package.json ./
COPY --from=base /web/next.config.mjs ./


# アプリケーションを起動
CMD ["npm", "start"]
