import jquery from "jquery"
window.$ = window.jQuery = jquery

$(function(){
  
  
  $(".navbar-toggler").on("click",()=>{
    console.log('aaaaa');
    $("#navbarNav").slideToggle("fast");
  })
  
  
  
  })
  