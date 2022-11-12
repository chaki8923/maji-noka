FROM ruby:3.1.2
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs vim
RUN mkdir /settlement/
WORKDIR /settlement
COPY /settlement/Gemfile /settlement/Gemfile
COPY /settlement/Gemfile.lock /settlement/Gemfile.lock
RUN bundle install
ADD . /api