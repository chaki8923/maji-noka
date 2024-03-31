# frozen_string_literal: true

class Slider < ApplicationRecord # rubocop:disable Style/Documentation
  mount_uploaders :images, ImageUploader
end
