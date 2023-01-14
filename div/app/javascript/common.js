import jquery from "jquery"
window.$ = window.jQuery = jquery

$(function(){
  
  $(".navbar-toggler").on("click",()=>{
    $("#navbarNav").slideToggle("fast");
  });


  $('.navbar li a').each(function () {
    var $href = $(this).attr('href');
    if (location.href.match($href)) {
      $(this).parent().addClass('active');
    } else {
      $(this).parent().removeClass('active');
    }
  });

  $('.navbar li a').on('click',(e)=>{
    $(e.target).addClass('active');
  })


    if(location.pathname != "/") {
        $('.navbar li a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
    } else $('.navbar li a:eq(0)').addClass('active');

  //======================================================================
  //アイデア登録画面の画像プレビュー
  //======================================================================

  //グレーのエリアクリックしたらinput fileクリックした事にする
  $('.js-preview-area').on('click', function () {
    $(`.js-input`).click();
  });

  
  $('.js-input').on('change', function (e) {
    console.log('change');
    
    var fileset = $(this).val();
    //ファイルの値空なら入れる
    if (fileset === '') {
      $(".js-previewImage").attr('src', "");
      $(`.js-previewImage`).css('opacity', 0);
    } else {
      //ファイルの値あるなら消す。キャンセル押した時プレビューも消す為
      var reader = new FileReader();
      reader.onload = function (e) {
        $(".js-previewImage").attr('src', e.target.result);
        $(`.js-previewImage`).css('opacity', 1);
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  });


  });
  