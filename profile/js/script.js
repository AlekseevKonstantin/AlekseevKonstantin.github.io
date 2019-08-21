$(document).ready(function(){
  
  /* default checkbox */

  $('.custom-switch').each(function(){
    var input = $(this).find('input');
    var slider = $(this).find('.custom-switch-slider');

    if($(input).attr('checked')){

      $(this).addClass('active');
      $(slider).addClass('active');
      $(input).attr('checked', true);
    }
  });

  $('.custom-switch').on('click', function(){

    var input = $(this).find('input');
    var slider = $(this).find('.custom-switch-slider');

    if(!$(input).attr('checked')){
      $(this).addClass('active');
      $(slider).addClass('active');
      $(input).attr('checked', true);
    }else{
      $(this).removeClass('active');
      $(slider).removeClass('active');
      $(input).attr('checked', false);
    }
  });


  function parseFieldPhone(value){
    return  value.replace(/[^-+()0-9\s]/gi,'');
  }

  function parseFieldNum(value){
    return  value.replace(/[^0-9]/gi,'');
  }

  $('#phoneNum').keyup(function(){
    $(this).val(parseFieldPhone($(this).val()));
  });

  $('#inputCorScore').keyup(function(){
    $(this).val(parseFieldNum($(this).val()));
  });

  $('#inputScore').keyup(function(){
    $(this).val(parseFieldNum($(this).val()));
  });

  $('#inputBIK').keyup(function(){
    $(this).val(parseFieldNum($(this).val()));
  });

  $('#inputKPP').keyup(function(){
    $(this).val(parseFieldNum($(this).val()));
  }); 
  
});