$(function(){

    $('.nav-btn-burger').on('click', function(e){

      e.preventDefault();

      $('.header').addClass('active');
      $('.nav').addClass('active');
      $('.nav').addClass('fadein');
      $('.scrollmagic-pin-spacer').css({"z-index":"-1"});
      $('.intro').css({"z-index":"-1"});
      $('.intro-container').css({"z-index":"-1"});
    });

    function menuClose(){
      setTimeout(function(){
        $('.nav').removeClass('fadein');
      }, 300)
        $('.header').removeClass('active');
        $('.nav').removeClass('active');
        $('.intro-container').removeAttr('style');
        $('.scrollmagic-pin-spacer').css({'z-index':'0'});
        $('.intro').css({'z-index':'0'});
    }

    $('.btn-menu-close').on('click', function(e){

      e.preventDefault();

      menuClose();
    })

    $('.programm-item-time__to').each(function(){
      if($(this).text() === ''){
        $(this).prev().css({'display': 'none'});
      }
    });

    $('.programm-item-more-link').on('click', function(e){

      e.preventDefault();

      $('.programm-item-info[data-link='+$(this).attr('data-link-open')+']').slideDown(300);
      $(this).parent().find('.programm-item-less-link').addClass('active');
      $(this).removeClass('active');
    });

    $('.programm-item-less-link').on('click', function(e){

      e.preventDefault();

      $('.programm-item-info[data-link='+$(this).attr('data-link-close')+']').slideUp(300);
      $(this).parent().find('.programm-item-more-link').addClass('active');
      $(this).removeClass('active');
    });

    $('.form__input').focusin(function(){
      $(this).addClass('active');
      $('label[for="'+$(this).attr('id')+'"]').addClass('active');
    });

    $('.form__input').focusout(function(){
      $(this).removeClass('active');
      if($(this).val() === ''){
        $('label[for="'+$(this).attr('id')+'"]').removeClass('active');
      }  
    });

    $('.form__select').change(function(){
      
      if($(this).val() === 'Выберите тип номера' || $(this).val() === 'Выберите тип размещения'){
        $('label[for="'+$(this).attr('id')+'"]').removeClass('active');
      }else{  
        $('label[for="'+$(this).attr('id')+'"]').addClass('active');
      }
    });

    $('.program-link').on('click', function(){
      $([document.documentElement, document.body]).animate({
        scrollTop: $(".content").offset().top
      }, 1000);
    });

    function menuLinkActive(that){
      $('.nav-link').removeClass('active');
      $(that).addClass('active');
    }

    function menuLinkUnActive(that){
      $(that).removeClass('active');
    }

    $('.nav-link').on('click', function(){

      menuLinkActive(this);
    });

    $('#programm').on('click', function(e){

      e.preventDefault();

      if($(this).width() < 992){
        menuClose();
      }

      setTimeout(function(){
        $('html, body').animate({
          scrollTop: $(".programm").offset().top
        }, 1000);
      },0);
      
    });

    $('#place').on('click', function(e){

      e.preventDefault();

      if($(this).width() < 992){
        menuClose();
      }

      setTimeout(function(){
        $('html, body').animate({
          scrollTop: $(".place").offset().top
        }, 1000);
      },0);
    });

    $('#oganizers').on('click', function(e){

      e.preventDefault();

      if($(this).width() < 992){
        menuClose();
      }

      setTimeout(function(){
        $('html, body').animate({
          scrollTop: $(".oganizers").offset().top
        }, 1000);
      },0);  
    });

    $('#partners').on('click', function(e){

      e.preventDefault();

      if($(this).width() < 992){
        menuClose();
      }

      setTimeout(function(){
        $('html, body').animate({
          scrollTop: $(".partners").offset().top
        }, 1000);
      },0);  
    });

    $('.btn-to-request').on('click', function(e){
      
      e.preventDefault();
       
      if($(this).width() < 992){
        menuClose();
      }

      setTimeout(function(){
        $('html, body').animate({
          scrollTop: $(".request-section").offset().top
        }, 1000);
      },0);  
    });

    $('.programm-date-item-link').on('click', function(e){

      e.preventDefault();

      var attr = $(this).attr('data-programm-to');

      $('.programm-date-item-link').removeClass('active');
      $('.programm-group').removeClass('active');

      $(this).addClass('active');
      $('.programm-group[data-programm="'+attr+'"]').addClass('active');
    });

    /* input mask */
    $("#phone").inputmask({"mask": "+7 (999) 999-99-99"});
    $("#email").inputmask({
      mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
      // regex : '\\/\\^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}\\$\\/\\i',
      greedy: false,
      onBeforePaste: function (pastedValue, opts) {
        pastedValue = pastedValue.toLowerCase();
        return pastedValue.replace("mailto:", "");
      },
      // "onincomplete": function(){ alert('inputmask incomplete'); },
      definitions: {
        '*': {
          validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
          casing: "lower"
        }
      }
    });

    /* scroll magic */

    var controller = new ScrollMagic.Controller();

    var pinScene = new ScrollMagic.Scene({
      triggerElement: '.intro',
      triggerHook: 0
    })
    .setPin('.intro')
    .addTo(controller);


    function blackout(that){

      var header = $('.header'),
          introMask = $('.intro-mask');

      var height = $('.intro').outerHeight(),
          scrollT = $(that).scrollTop(),
          percent = scrollT*100/height,
          introBlackout = 0.5*percent/100,
          headerBlackout = 0.98*percent/100,
          headerTY = percent;    

      if(scrollT < 50){
        $(introMask.css({'visibility': 'hidden' }));
      }else{
        
        $(introMask.css({'visibility': 'visible'}));
        
      }

      if(height-10 <= scrollT){
        $(header).css({
          'transition' :'.6s',
          'transform': 'translate(-50%, 0)',
          'background-color': 'rgba(255,255,255, .99)'});
      }else{
        if($(header).is('[style]')){
          $(header).removeAttr('style');
        }

        if(percent > 85){
          $(header).css({
            'transition': '.6s',
            'transform': 'translate(-50%,-'+headerTY+'%)'});
        }else{
          $(header).css({
            'transition': 'none',
            'transform': 'translate(-50%,-'+headerTY+'%)'});
        }

        $(introMask).css({'opacity': introBlackout});
        // $(header).css({'transform': 'translate(-50%,-'+headerTY+'%)'});
      } 
    }

    $(window).scroll(function(){
      blackout(this);

      var programm = $(".programm"),
          place = $('.place'),
          oganizers = $('.oganizers'),
          partners = $('.partners');

      if ($(window).scrollTop() >= $(programm).offset().top && 
          $(window).scrollTop() <= $(programm).offset().top + $(programm).outerHeight()){

        menuLinkActive($('#programm'));
      }else{
        menuLinkUnActive($('#programm'))
      }

      if ($(window).scrollTop() >= $(place).offset().top && 
          $(window).scrollTop() <= $(place).offset().top + $(place).outerHeight()){

        menuLinkActive($('#place'));
      }else{
        menuLinkUnActive($('#place'))
      }

      if ($(window).scrollTop() >= $(oganizers).offset().top &&
          $(window).scrollTop() <= $(oganizers).offset().top + $(oganizers).outerHeight()){
        
        menuLinkActive($('#oganizers'));
      }else{
        menuLinkUnActive($('#oganizers'))
      }

      if ($(window).scrollTop() >= $(partners).offset().top &&
          $(window).scrollTop() <= $(partners).offset().top + $(partners).outerHeight()){

        menuLinkActive($('#partners'));
      }else{
        menuLinkUnActive($('#partners'))
      }

    });

    /* init */

    blackout($(window));

})




