FROM ruby:3.1.2
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs vim
RUN mkdir /api/
WORKDIR /api
COPY /api/Gemfile /api/Gemfile
COPY /api/Gemfile.lock /api/Gemfile.lock
RUN bundle install
