import jquery from "jquery"
window.$ = window.jQuery = jquery
console.log('aaaaa');

$(function(){


  $(".navbar-toggler").on("click",()=>{
    $("#navbarNav").slideToggle("fast");
  })
  
  
  
  })
  