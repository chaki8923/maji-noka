import jquery from "jquery"
window.$ = window.jQuery = jquery

$(function(){
  
  $(".navbar-toggler").on("click",()=>{
    $("#navbarNav").slideToggle("fast");
  });


  $('.navbar li a').each(function () {
    var $href = $(this).attr('href');
    console.log($href);
    if (location.pathname === $href) {      
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });

  $('.navbar li a').on('click',(e)=>{
    $(e.target).addClass('active');
  })


    
  //======================================================================
  //アイデア登録画面の画像プレビュー
  //======================================================================

  //グレーのエリアクリックしたらinput fileクリックした事にする
  
 
  function imagePreview(i, e){
      var fileset = $(this).val();
      //ファイルの値空なら入れる
      if (fileset === '') {
        $(`.js-previewImage-${i}`).attr('src', "");
        $(`.js-previewImage-${i}`).css('opacity', 0);
      } else {
        //ファイルの値あるなら消す。キャンセル押した時プレビューも消す為
        var reader = new FileReader();
        reader.onload = function (e) {
          $(`.js-previewImage-${i}`).attr('src', e.target.result);
          $(`.js-previewImage-${i}`).css('opacity', 1);
        }
        // バイト数表示用に取得
        var byte = Math.ceil(e.target.files[0].size/1000);
        $(`.js-byte-preview${i}`).text(byte.toLocaleString() + "Kバイト")
        if(byte > 3000){
          $(`.js-byte-preview${i}`).css("color","red");
        }else{

        }
        reader.readAsDataURL(e.target.files[0]);
      };

  };
  // なんかfor文で上手くいかん
  $(`.js-input-1`).on('change', function (e) {
    imagePreview(1, e);
  });
  $(`.js-input-2`).on('change', function (e) {

    imagePreview(2, e);
  });
  $(`.js-input-3`).on('change', function (e) {

    imagePreview(3, e);
  });
  $(`.js-input-4`).on('change', function (e) {

    imagePreview(4, e);
  });

  //======================================================================
  //toggleメッセージ
  //======================================================================

  if($('.js-toggle-msg') && $('.js-toggle-msg').text().length){
    
    $('.js-toggle-msg').show()
    setTimeout(()=>{
      $('.js-toggle-msg').fadeOut()
    },3000)

    
  }


  });
  