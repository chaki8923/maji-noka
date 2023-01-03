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

  })
  