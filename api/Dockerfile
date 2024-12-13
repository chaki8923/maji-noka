# syntax=docker/dockerfile:1
FROM --platform=linux/x86_64 ruby:3.1.2

# Node.jsとYarnのバージョンを指定
ENV NODE_VERSION=14.x
ENV YARN_VERSION=1.22.19

# Node.jsとYarnのインストール
RUN curl -sL https://deb.nodesource.com/setup_${NODE_VERSION} | bash - && \
    apt-get update -qq && \
    apt-get install -y nodejs postgresql-client

# アプリケーションディレクトリの作成
WORKDIR /api

# GemfileとGemfile.lockをコピー
COPY Gemfile Gemfile.lock ./

# Gemのインストール
RUN bundle install

# アプリケーションコードをコピー
COPY . .

# entrypoint.shをコピーして実行権限を付与
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

# コンテナ起動時にentrypoint.shを実行
ENTRYPOINT ["entrypoint.sh"]

# Pumaサーバーを起動
CMD ["rails", "server", "-b", "0.0.0.0"]

# # 開発用
# # syntax=docker/dockerfile:1
# FROM --platform=linux/x86_64 ruby:3.1.2

# # Node.jsとYarnのバージョンを指定
# ENV NODE_VERSION=14.x
# ENV YARN_VERSION=1.22.19

# # Node.jsとYarnのインストール
# RUN curl -sL https://deb.nodesource.com/setup_${NODE_VERSION} | bash - && \
#     apt-get update -qq && \
#     apt-get install -y nodejs postgresql-client

# # アプリケーションディレクトリの作成
# WORKDIR /api
# COPY /api/Gemfile /api/Gemfile
# COPY /api/Gemfile.lock /api/Gemfile.lock
# # BundlerをインストールしてGemをインストール
# RUN bundle install
