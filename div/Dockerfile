FROM ruby:3.1.2
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs vim
RUN mkdir /div/
WORKDIR /div
COPY /div/Gemfile /div/Gemfile
COPY /div/Gemfile.lock /div/Gemfile.lock
RUN bundle install
ADD . /api