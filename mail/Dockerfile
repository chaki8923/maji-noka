FROM ruby:3.1.2
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs vim
RUN mkdir /mail/
WORKDIR /mail
COPY /mail/Gemfile /mail/Gemfile
COPY /mail/Gemfile.lock /mail/Gemfile.lock
RUN bundle install