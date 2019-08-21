$(document).ready(function(){

  /* cariables */

  var newsCurIndex = 0,
      mainSliderCurIndex = 0;

  /* calculate */
  function calculate(){
    var from = $('#from option[selected]').val(),
        to = $('#to option[selected]').val(),
        massa = $( "#progress-slider" ).slider( "value" ),
        pickup = $('.radio-button[checked="checked"]').val() === 'Забрать курьером' ? false : true,
        insurance = $('.checkbox[checked="checked"]').length === 0 ? false : true,
        distance = 0,
        exportValue = 0,
        insuranceСost = 0,
        result = 0;

    if (!pickup){
      exportValue = 50 * massa;
    }
    
    if(insurance){
      insuranceСost = 5 * massa;
    }

    if((from === 'Москва' && to === 'Санкт-Петербург') || (from === 'Санкт-Петербург' && to === 'Москва')){
      distance = 712;
    }else if((from === 'Москва' && to === 'Екатеринбург') || (from === 'Екатеринбург' && to === 'Москва')){
      distance = 1795;
    }else if((from === 'Санкт-Петербург' && to === 'Екатеринбург') || (from === 'Екатеринбург' && to === 'Санкт-Петербург')){
      distance = 2301;
    }

    result = Math.round(distance * massa * 0.2 + exportValue + insuranceСost);

    $('.submit-value').html(result.toLocaleString() + '<span class="submit-value__valuta"> руб.</span>');
  }

  function newsSliderHeadHeight(){
    var maxHeight = 0;
    $('.news-slider-item__head').each(function(){
      var  height = $(this).height();
      if( height > maxHeight){
        maxHeight = height;
      }    
    });

    $('.news-slider-item__head').height(maxHeight);
    
   /*  var h = $('.news-slider-item').outerHeight();

    $('.news-slider').height(h); */
  }

  function rightNextSlide(){
    var slids = $('.slider-item'),
        curSlide = $('.slider-item.active'),
        curSlideAttr = parseInt( $(curSlide).attr('data-slide') ) + 1,
        curSlideHead = $(curSlide).find('.slider-item-head'),
        curSlideInfo = $(curSlide).find('.slider-item-info');

    if(curSlideAttr > lastSlide){
      curSlideAttr = 0;
    }
    
    var nextSlide = $('.slider-item[data-slide="'+curSlideAttr+'"]'),
        nextSlideHead = $(nextSlide).find('.slider-item-head'),
        nextSlideInfo = $(nextSlide).find('.slider-item-info');

    $(curSlide).removeClass('active');
    $(curSlideHead).removeClass('active');
    $(curSlideInfo).removeClass('active');

    $(nextSlide).addClass('active');
    $(nextSlideHead).addClass('active');
    $(nextSlideInfo).addClass('active');
  }

  function leftNextSlide(){
    var slids = $('.slider-item'),
        curSlide = $('.slider-item.active'),
        curSlideAttr = parseInt( $(curSlide).attr('data-slide') ) - 1,
        curSlideHead = $(curSlide).find('.slider-item-head'),
        curSlideInfo = $(curSlide).find('.slider-item-info');

    if (curSlideAttr < 0){
      curSlideAttr = $('.slider-item').length-1;
    }    

    var nextSlide = $('.slider-item[data-slide="'+curSlideAttr+'"]'),
    nextSlideHead = $(nextSlide).find('.slider-item-head'),
    nextSlideInfo = $(nextSlide).find('.slider-item-info');

    $(curSlide).removeClass('active');
    $(curSlideHead).removeClass('active');
    $(curSlideInfo).removeClass('active');

    $(nextSlide).addClass('active');
    $(nextSlideHead).addClass('active');
    $(nextSlideInfo).addClass('active');
  }

  /* phone mask */
  $("#phone").inputmask({"mask": "+7 (999) 999-99-99"});
  $("#rphone").inputmask({"mask": "+7 (999) 999-99-99"});

  /* events */

  $('.btn-nav-collapse-open').on('click', function(e){
    e.preventDefault();

    $('.nav').css({'position': 'static'});
    $('.nav-collapse').addClass('active');
  });

  $('.btn-nav-collapse-close').on('click', function(e){
    e.preventDefault();

    $('.nav-collapse').on('transitionend',function(){
      $('.nav').removeAttr('style');
      $(this).off('transitionend');
    });

    $('.nav-collapse').removeClass('active');
    
  });

  $('.btn-req-send').on('click', function(e){
    e.preventDefault();

    if ($('#rname').val() === ''){
      $('#rname').next().addClass('active');
      $('#rname').addClass('empty');
    }else{
      if($('#rname').hasClass('empty')){
        $('#rname').next().removeClass('active');
        $('#rname').removeClass('empty');
      }
    }

    if ($('#rphone').val() === ''){
      $('#rphone').next().addClass('active');
      $('#rphone').addClass('empty');
    }else{
      if($('#rphone').hasClass('empty')){
        $('#rphone').next().removeClass('active');
        $('#rphone').removeClass('empty');
      }
    }

    if ($('#rname').val() !== '' && $('#rphone').val() !== ''){
      $('.request-call-form-section').removeClass('active');
    }
  });

  $('.btn-send').on('click', function(e){
    e.preventDefault();

    if($('#userName').val() === ''){
      $('#userName').next().addClass('active');
      $('#userName').addClass('empty');
    }else{
      if($('#userName').hasClass('empty')){
       $('#userName').next().removeClass('active');
       $('#userName').removeClass('empty');
      }
    }

    if($('#phone').val() === ''){
      $('#phone').next().addClass('active');
      $('#phone').addClass('empty');
    }else{
      if($('#phone').hasClass('empty')){
       $('#phone').next().removeClass('active');
       $('#phone').removeClass('empty');
      }
    }

    if($('#message').val() === ''){
      $('#message').next().addClass('active');
      $('#message').addClass('empty');
    }else{
      if($('#message').hasClass('empty')){
       $('#message').next().removeClass('active');
       $('#message').removeClass('empty');
      }
    }

  });

  $('.btn-req-call-form-close').on('click', function(e){
    e.preventDefault();
    $('.request-call-form-section').removeClass('active');
  });

  $('.btn-request-call').on('click', function(e){
    var form = $('.request-call-form-section');
    if(!$(form).hasClass('active')){
      $(form).addClass('active');
    }  
  });

  $('.btn-contacts-request-call').on('click', function(){
    var form = $('.request-call-form-section');
    if(!$(form).hasClass('active'))
      $(form).addClass('active');
  });

  $( "#to" ).change(function() {
    $('#to option[selected]').attr('selected', false);
    $('#to option[value="'+$(this).val()+'"]').attr('selected', true);
  });

  $( "#from" ).change(function() {
    $('#from option[selected]').attr('selected', false);
    $('#from option[value="'+$(this).val()+'"]').attr('selected', true);
  });

  $('.btn-submit-calculate').on('click', function(){
    calculate();
  });

  $("#progress-slider").slider({
    range: "min",
    min: 1,
    max: 500,
    value: 10,
    slide: function( event, ui ) {
      $( "#progress-slider-caption" ).text( ui.value + ' кг.');
      $( "#progress-slider-caption" ).css({"left" : Math.round(ui.value/ 500 * 100)-5+"%"});
    },
  });

  $('.ridio-button-wrapper').on('click', function(e){
    if (e.target.tagName == 'INPUT'){
      var radioBtn = $(this).find('.radio-button');
      if($(radioBtn).attr('checked') !== "checked"){
        $('.radio-button').attr("checked", false);
        $(radioBtn).attr("checked", true);
      }
    }  
  });

  $('.checkbox-wrapper').on('click', function(e){
    if (e.target.tagName == 'INPUT'){
      var radioBtn = $(this).find('.checkbox');
      if($(radioBtn).attr('checked') !== "checked"){
        $(radioBtn).attr("checked", true);
      }else{
        $(radioBtn).attr("checked", false);
      }
    }  
  });

  $(document).mouseup(function (e) {

    if($('.request-call-form-section').hasClass('active')){
      if (!$(e.target).closest(".request-call-form-section").length) {
        $('.request-call-form-section').removeClass('active');
      }
      e.stopPropagation();
    }
  });

  $(document).mouseup(function (e) {

    if($('.nav-collapse').hasClass('active')){
      if (!$(e.target).closest(".nav-collapse").length) {
        $('.nav-collapse').removeClass('active');
      }
      e.stopPropagation();
    }
  });

  /* hover */

  $('.btn-request-call').hover(
    function(){
      var btnIcon = $(this).find('.btn-request-call__icon');
      $(btnIcon).fadeOut(200, function () {
        $(btnIcon).attr('src', 'img/white-phone-icon.svg');
        $(btnIcon).fadeIn(200);
    });
    }, 
    function(){
      var btnIcon = $(this).find('.btn-request-call__icon');
      $(btnIcon).fadeOut(180, function () {
        $(btnIcon).attr('src', 'img/phone-icon-call.svg');
        $(btnIcon).fadeIn(180);
    });
  });  


  $('.news-slider-item-more').hover(
    function(){
      var btnIcon = $(this).find('.news-slider-item__icon');
      $(btnIcon).fadeOut(150, function () {
        $(btnIcon).attr('src', 'img/white-plus-icon.svg');
        $(btnIcon).fadeIn(150);
    });
    }, 
    function(){
      var btnIcon = $(this).find('.news-slider-item__icon');
      $(btnIcon).fadeOut(150, function () {
        $(btnIcon).attr('src', 'img/black-plus-icon.svg');
        $(btnIcon).fadeIn(150);
    });
  }); 
  
  
  $('.slider-item-info-link').hover(
    function(){
      var btnIcon = $(this).find('.slider-item-info__icon');
      $(btnIcon).fadeOut(150, function () {
        $(btnIcon).attr('src', 'img/orange-cross-icon.svg');
        $(btnIcon).fadeIn(150);
    });
    }, 
    function(){
      var btnIcon = $(this).find('.slider-item-info__icon');
      $(btnIcon).fadeOut(150, function () {
        $(btnIcon).attr('src', 'img/white-plus.svg');
        $(btnIcon).fadeIn(150);
    });
  });

  $('.news-slider-right-control').hover(
    function(){
      var btnIcon = $(this).find('.slider-controls-icon');
      $(btnIcon).fadeOut(150, function () {
        $(btnIcon).attr('src', 'img/white-arrow-right-icon.svg');
        $(btnIcon).fadeIn(150);
    });
    }, 
    function(){
      var btnIcon = $(this).find('.slider-controls-icon');
      $(btnIcon).fadeOut(150, function () {
        $(btnIcon).attr('src', 'img/news-slider-right-control.svg');
        $(btnIcon).fadeIn(150);
    });
  });

  $('.news-slider-left-control').hover(
    function(){
      var btnIcon = $(this).find('.slider-controls-icon');
      $(btnIcon).fadeOut(150, function () {
        $(btnIcon).attr('src', 'img/white-arrow-left-icon.svg');
        $(btnIcon).fadeIn(150);
    });
    }, 
    function(){
      var btnIcon = $(this).find('.slider-controls-icon');
      $(btnIcon).fadeOut(150, function () {
        $(btnIcon).attr('src', 'img/news-slider-left-control.svg');
        $(btnIcon).fadeIn(150);
    });
  });

  /* resize */

  $(window).resize(function(){
    newsSliderHeadHeight();

    $("#progress-slider").slider({
      range: "min",
      min: 1,
      max: 500,
      value: 10,
      slide: function( event, ui ) {
        $( "#progress-slider-caption" ).text( ui.value + ' кг.');
        $( "#progress-slider-caption" ).css({"left" : Math.round(ui.value/ 500 * 100)-5+"%"});
      },
    });
  });
  

  /* news slider */
  var rightFlagCan = true,
      leftFlagCan = true;

  $('.news-slider-right-control').on('click', function(e){
    e.preventDefault();

    if(rightFlagCan){

      rightFlagCan = false;
      var slids = $('.news-slider-item');

      $(slids).each(function(){

        var slideNum = parseInt($(this).attr('data-slide'))-1;
        $(this).css({'transform': 'translateX('+(slideNum)*100+'%)'});  

        if(slideNum <= -2){

          $(this).on('transitionend',function(){
            
            var a = parseInt($(this).attr('data-slide'));

            if(a === $(slids).length-2){

              $(this).css({
                'transition': 'none',
                'opacity': '0',
                'transform': 'translateX('+(a)*100+'%)'
              });
              $(this).off('transitionend');
              rightFlagCan = true;
            }
          });

          slideNum = $(slids).length-2;   
          $(this).attr('data-slide', slideNum); 
        } 

        if(slideNum >= $(slids).length-3){
          $(this).css({
            'opacity': '1',
            'transition': 'transform .5s ease-out'
          });
        } 
        
        $(this).attr('data-slide', slideNum); 
      
      });
    }  
  }); 

  $('.news-slider-left-control').on('click', function(e){
    e.preventDefault();

    if(leftFlagCan){

      leftFlagCan = false;
      var slids = $('.news-slider-item');

      $(slids).each(function(){

        var slideNum = parseInt($(this).attr('data-slide'))+1;
        
        $(this).css({'transform': 'translateX('+(slideNum)*100+'%)'}); 
        
        if(slideNum >= $(slids).length-1){

          $(this).on('transitionend',function(){
            
            var a = parseInt($(this).attr('data-slide'));

            if(a === -1){

              $(this).css({
                'transition': 'none',
                'opacity': '0',
                'transform': 'translateX(-100%)'
              });
              $(this).off('transitionend');
              leftFlagCan = true;
            }
          });

          slideNum = -1;   
          $(this).attr('data-slide', slideNum); 
        }

        if(parseInt($(this).attr('data-slide')) <= -1){
          $(this).css({
            'opacity': '1',
            'transition': 'transform .5s ease-out'
          });
        } 

        $(this).attr('data-slide', slideNum); 
      });  
    }
  });

  /* main slider */
  var lastSlide = $('.slider-item').length-1,
      firstSlide = 0;

  $('.slider-right-control').on('click', function(e){
    e.preventDefault();

    rightNextSlide();
  })

  $('.slider-left-control').on('click', function(e){
    e.preventDefault();

    leftNextSlide();
  });

  /* init */
  $( "#progress-slider-caption" ).text( $("#progress-slider").slider("value")+" кг." );
  calculate();

  newsSliderHeadHeight();

  /* news slider */
  var dataSlide;
  $('.news-slider-item').each(function(){
    dataSlide = parseInt($(this).attr('data-slide'));
    $(this).css({
      'transform': 'translateX('+dataSlide*100+'%)'
    });
  }).css({"transition":"transform .5s ease-out"});

  /* clone slide */
  var dsi = $('.news-slider-item[data-slide="'+dataSlide+'"]').clone(true);
  $(dsi).attr('data-slide', '-1');
  $('.news-slider-inner').prepend(dsi);
  $(dsi).css({
    'transform': 'translateX(-100%)'
  });

  /* main slider */
  setTimeout(function(){
    $('.slider-item').css({'transition' : 'all 1s ease-in-out'});
  }, 0);

  setInterval(function() {
    rightNextSlide();
  }, 3500);

  $(".how-we-work__head").pxgradient({
      step: 10, 
      colors: ["#e42d1e","#f88a11"], 
      dir: "x" 
  });
  
});