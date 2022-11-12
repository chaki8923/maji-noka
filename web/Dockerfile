FROM ruby:3.1.2
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs vim
RUN mkdir /web/
WORKDIR /web
COPY /web/Gemfile /web/Gemfile
COPY /web/Gemfile.lock /web/Gemfile.lock
RUN bundle install
ADD . /api