# syntax=docker/dockerfile:1
FROM ruby:3.1.2
RUN apt-get update -qq \
 && apt-get install -y nodejs postgresql-client npm \
 && rm -rf /var/lib/apt/lists/* \
 && npm install --global yarn
WORKDIR /web
COPY /web/Gemfile /web/Gemfile
COPY /web/Gemfile.lock /web/Gemfile.lock
RUN bundle install