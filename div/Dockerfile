# syntax=docker/dockerfile:1
FROM ruby:3.1.2
RUN apt-get update -qq \
 && apt-get install -y nodejs postgresql-client npm \
 && rm -rf /var/lib/apt/lists/* \
 && npm install --global yarn
WORKDIR /div
COPY /div/Gemfile /div/Gemfile
COPY /div/Gemfile.lock /div/Gemfile.lock
RUN bundle install