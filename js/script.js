$(document).ready(function () {

  
  (function () {

      var minHeight = 1000000000000;

      $('.card-img-wrapper').each(function () {

        var height = parseFloat( $(this).css('height') );

        if (height < minHeight) {
          minHeight = height;
        }
      })

      $('.card-img-wrapper').css({
        'height': minHeight + 'px',
        'max-height': minHeight + 'px'
      });

  })();

  $('.xz-accordion-body').hide();

  $('.xz-accordion-header').on('click', function () {
    if ($(this).hasClass('active')) {

      $('.xz-accordion-header .xz-accordion-open').removeClass('active');

      var attr = $(this).attr('data-body-to');
      $('.xz-accordion-body[data-body="' + attr + '"]').slideUp(400);
      $(this).removeClass('active');
    } else {
      $('.xz-accordion-header').removeClass('active');
      $('.xz-accordion-body').slideUp(400);

      $('.xz-accordion-header .xz-accordion-open').removeClass('active');
      $(this).find('.xz-accordion-open').addClass('active');

      var attr = $(this).attr('data-body-to');
      $('.xz-accordion-body[data-body="' + attr + '"]').slideDown(400);
      $(this).addClass('active');
    }
  });

  setTimeout(function() {
    $('.wrapper.hidden').removeClass('hidden');
  }, 400);
});