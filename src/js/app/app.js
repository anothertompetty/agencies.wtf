$(document).on('ready', function() {

  $('.menu__button').on('click', function() {
    $('.menu').fadeToggle(125);
    $('.menu__button__icon').fadeToggle(125);
    $('.menu__button__icon--close').fadeToggle(125);
  });

});