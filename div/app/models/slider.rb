# frozen_string_literal: true

class Slider < ApplicationRecord # rubocop:disable Style/Documentation
  mount_uploaders :images, ImageUploader
  skip_callback :store_previous_changes_for_images
  skip_callback :remove_images!, on: :destroy
  skip_callback :mark_remove_images_false, on: :update
  skip_callback :remove_previously_stored_images, on: :update
  skip_callback :store_images!, on: [:create, :update]
end
