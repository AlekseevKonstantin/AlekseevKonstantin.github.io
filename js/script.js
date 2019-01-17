$(document).ready(function(){

  $('.list-group-item').on('click', function(e){
    
    var itemNum = $(this).attr('data-num-content-item');
    var conItem = $('.custom-content-item[data-num="'+itemNum+'"]');
    
    $('.list-group-item').removeClass('active');
    $('.custom-content-item').removeClass('active');

    $(this).addClass('active');
    $(conItem).addClass('active');
  });
})