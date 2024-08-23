// import jquery from "jquery";
// window.$ = window.jQuery = jquery;
$(function () {
  $(".navbar-toggler").on("click", () => {
    $("#navbarNav").slideToggle("fast");
  });

  $(".navbar li a").each(function () {
    var $href = $(this).attr("href");
    if (location.pathname === $href) {
      $(this).addClass("active");
    } else {
      $(this).removeClass("active");
    }
  });

  $(".navbar li a").on("click", (e) => {
    $(e.target).addClass("active");
  });

  //======================================================================
  //アイデア登録画面の画像プレビュー
  //======================================================================

  $(`.js-multi-image`).on("change", function (e) {
    console.log("e", e);
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      multiImagePreview(file, i);
    }
  });
  function multiImagePreview(file, index) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(`.js-previewImage-${index + 1}`).attr("src", e.target.result);
      $(`.js-previewImage-${index + 1}`).css("opacity", 1);
    };
    reader.readAsDataURL(file);
  }

  function imagePreview(i, e) {
    var fileset = $(this).val();
    //ファイルの値空なら入れる
    if (fileset === "") {
      $(`.js-previewImage-${i}`).attr("src", "");
      $(`.js-previewImage-${i}`).css("opacity", 0);
    } else {
      //ファイルの値あるなら消す。キャンセル押した時プレビューも消す為
      var reader = new FileReader();
      reader.onload = function (e) {
        $(`.js-previewImage-${i}`).attr("src", e.target.result);
        $(`.js-previewImage-${i}`).css("opacity", 1);
      };
      // バイト数表示用に取得
      var byte = Math.ceil(e.target.files[0].size / 1000);
      $(`.js-byte-preview${i}`).text(byte.toLocaleString() + "Kバイト");
      if (byte > 3000) {
        $(`.js-byte-preview${i}`).css("color", "red");
      } else {
      }
      console.log("e.target", e.target.files);
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  // なんかfor文で上手くいかん
  $(`.js-input-1`).on("change", function (e) {
    console.log("e", e);

    imagePreview(1, e);
  });
  $(`.js-input-2`).on("change", function (e) {
    imagePreview(2, e);
  });
  $(`.js-input-3`).on("change", function (e) {
    imagePreview(3, e);
  });
  $(`.js-input-4`).on("change", function (e) {
    imagePreview(4, e);
  });

  //======================================================================
  //toggleメッセージ
  //======================================================================

  if ($(".js-toggle-msg") && $(".js-toggle-msg").text().length) {
    $(".js-toggle-msg").show();
    setTimeout(() => {
      $(".js-toggle-msg").fadeOut();
    }, 3000);
  }

  $(".delete-button").on("click", function (e) {
    e.preventDefault(); // デフォルトのイベントをキャンセルする
    var result = confirm("本当に削除しますか？");
    if (result) {
      // OKボタンがクリックされた場合、DELETEリクエストを送信
      $(this).closest("form").submit();
    }
  });

  $(".logout-button").on("click", function (e) {
    e.preventDefault(); // デフォルトのイベントをキャンセルする
    var result = confirm("ログアウトしますか？");
    if (result) {
      // OKボタンがクリックされた場合、DELETEリクエストを送信
      $(this).closest("form").submit();
    }
  });

  var noneChecked = $(".js-form-select:checked").length === 0;
  $(".js-check-submit").prop("disabled", noneChecked);

  $(".js-form-select").on("change", function () {
    // チェックボックスのチェック状態を取得
    var isChecked = $(this).prop("checked");
    // 一つもチェックされていないチェックボックスがあるかどうかを確認
    var noneChecked = $(".js-form-select:checked").length === 0;

    var fieldNameAry = [
      "state_field",
      "country_field",
      "line1_field",
      "line2_field",
      "postal_field",
      "purchase_field",
      "email_field",
      "item_field",
      "customer_id_field",
    ];
    // チェックボックスに関連付けられたdata属性の値を取得
    var dataValue = $(this).data("index");
    $(".js-check-submit").prop("disabled", noneChecked);

    fieldNameAry.forEach(function (fieldName) {
      $("#" + fieldName + dataValue).prop("disabled", !isChecked);
    });
  });

  // 初期状態でfile_fieldが選択されていないときは、submitボタンを無効にする
  checkFileField();

  // file_fieldの変更を監視する
  $(".slide_field").on("change", function () {
    checkFileField();
  });

  function checkFileField() {
    if ($(".slide_field").val() === "") {
      $(".slide-submit").prop("disabled", true);
    } else {
      $(".slide-submit").prop("disabled", false);
    }
  }
});
