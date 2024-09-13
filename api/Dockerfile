# syntax=docker/dockerfile:1
FROM ruby:3.1.2
RUN apt-get update -qq \
 && apt-get install -y nodejs postgresql-client npm \
 && rm -rf /var/lib/apt/lists/* \
 && npm install --global yarn
WORKDIR /api
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bundle install
