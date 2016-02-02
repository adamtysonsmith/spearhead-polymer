if (window.location.pathname == '/') run(jQuery);

function run($) {
  $(document).ready(function() {
    $('#create-account-form').hide();

    var opts = {
      done: function() {
        $('.home-header').hide();
        $('#create-account-form').show();
      }
    }

    $('#create-account-btn').one('click', function(evt) {
      evt.preventDefault();
      $('home-login').fadeOut();
      $('.bg-lt-blue').slideToggle(opts);
      $('.bg-lt-blue').slideToggle();
    });
  });
}