# ベースイメージの設定
FROM node:18-alpine AS base

# 作業ディレクトリの設定
WORKDIR /web

# package.jsonとyarn.lockをコピー
COPY package.json ./

# 必要な依存関係をインストール
RUN npm install

# prismaのファイルをコピー
COPY prisma ./prisma/

# ダミーのDATABASE_URLを設定
# ARG DATABASE_URL="postgres://postgres:password@localhost:5434/web_development?schema=public"
# ENV DATABASE_URL=$DATABASE_URL

# Prisma Clientを生成するために環境変数を指定
# RUN DATABASE_URL=$DATABASE_URL npx prisma generate

# ソースコードをコピー
COPY . .
# 実際のデータベースの接続情報を設定
ENV NODE_ENV=production

# Next.jsのビルドを実行
RUN npm run build

# 実行環境のイメージを構築
FROM node:18-alpine AS production

# 作業ディレクトリの設定
WORKDIR /web

# 依存関係をコピー
COPY --from=base /web/node_modules ./node_modules

# ビルド成果物と必要なファイルをコピー
COPY --from=base /web/.next ./.next
COPY --from=base /web/public ./public
COPY --from=base /web/package.json ./

# ENV DATABASE_URL="postgresql://maji_master:maji_password@maji-db.c8x1ub9aigmb.ap-northeast-1.rds.amazonaws.com:5432/maji_database"

# アプリケーションを起動
CMD ["npm", "start"]
