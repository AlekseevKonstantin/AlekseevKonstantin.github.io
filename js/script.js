$(document).ready(function(){
  
  $(".custom-nav-link").on('click', function (event) {
      event.preventDefault();
  
      var id  = $(this).attr('href'),
          top = $(id).offset().top;

      if(!$(this).hasClass('active')){
        $(".custom-nav-link").removeClass('active');
        $(this).addClass('active');
      }

      $('body,html').animate({scrollTop: top-50}, 500);
  });

  $(window).resize(function(){
    var nbc = $('.navbar-collapse'),
        attr = $('.navbar-collapse').attr('style');

    if(attr === 'height: 1px;'){
      $(nbc).removeAttr('style');
    }
  });
    
})