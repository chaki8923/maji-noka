# syntax=docker/dockerfile:1
FROM --platform=linux/x86_64 ruby:3.1.2

# Node.jsとYarnのバージョンを指定
ENV NODE_VERSION=14.x
ENV YARN_VERSION=1.22.19

# Node.jsとYarnのインストール
RUN curl -sL https://deb.nodesource.com/setup_${NODE_VERSION} | bash - && \
    apt-get update -qq && \
    apt-get install -y nodejs postgresql-client && \
    npm install -g yarn@${YARN_VERSION}

# アプリケーションディレクトリの作成
WORKDIR /div

# GemfileとGemfile.lockをコピー
COPY Gemfile Gemfile.lock ./

# Gemのインストール
RUN bundle install

# アプリケーションコードをコピー
COPY . .

# パッケージのインストールとCSSビルドを実行
RUN yarn cache clean && yarn install --check-files --verbose
RUN yarn build:css

# entrypoint.shをコピーして実行権限を付与
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

# コンテナ起動時にentrypoint.shを実行
ENTRYPOINT ["entrypoint.sh"]

# Pumaサーバーを起動
CMD ["rails", "server", "-b", "0.0.0.0"]