
# frozen_string_literal: true
require 'rails_helper'
require 'faker'
Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }

RSpec.describe Image do
  # 画像データを作成するヘルパーメソッド
  def uploaded_file(filename)
  ActionDispatch::Http::UploadedFile.new(
    tempfile: File.new(Rails.root.join("spec/fixtures/#{filename}")),
    filename: filename,
    type: 'image/jpeg'
  )
  end

  # 画像データを配列に格納する
  let(:uploaded_files) do
  [
    uploaded_file('test_image1.jpg'),
    uploaded_file('test_image2.jpg'),
    uploaded_file('test_image3.jpg'),
    uploaded_file('test_image4.jpg')
  ]
  end

  # エラーになる画像データを配列に格納する
  let(:err_uploaded_files) do
  [
    uploaded_file('test_image1.jpg'),
    uploaded_file('test_image2.jpg'),
    uploaded_file('test_image3.jpg'),
    uploaded_file('size_over.jpg')
  ]
  end

  # 各ファイルの期待されるサイズ（バイト単位）
  let(:pass_expected_sizes) do
    [
      File.size(Rails.root.join('spec/fixtures/test_image1.jpg')),
      File.size(Rails.root.join('spec/fixtures/test_image2.jpg')),
      File.size(Rails.root.join('spec/fixtures/test_image3.jpg')),
      File.size(Rails.root.join('spec/fixtures/test_image4.jpg'))
    ]
  end

  # 各ファイルの期待されるサイズ（バイト単位）
  let(:err_expected_sizes) do
    [
      File.size(Rails.root.join('spec/fixtures/test_image1.jpg')),
      File.size(Rails.root.join('spec/fixtures/test_image2.jpg')),
      File.size(Rails.root.join('spec/fixtures/test_image3.jpg')),
      File.size(Rails.root.join('spec/fixtures/size_over.jpg'))
    ]
  end

  context 'new' do

    it 'インスタンスを生成できる' do
      object, err = Image.new(value: uploaded_files, action: "create")
      expect(object.value).to eq uploaded_files
    end

    it '新規登録時にファイルがないとエラーになる' do
      _, err = Image.new(value: nil, action: "create")
      expect(err).not_to be nil
    end

    it '2000キロバイト未満だとインスタンス化できる' do
      object, err = Image.new(value: uploaded_files, action: "create")
      expect(err).to be nil
    end

    it '2000キロバイト以上だとエラーになる' do
      _, err = Image.new(value: err_uploaded_files, action: "create")
      expect(err).not_to be nil
    end

  end
end
