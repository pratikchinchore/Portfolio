// Init AOS
document.addEventListener("DOMContentLoaded", function() {
  AOS.init({ duration: 900, once: true });

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Project modal population
  var projectModal = document.getElementById('projectModal');
  if (projectModal) {
    projectModal.addEventListener('show.bs.modal', function (event) {
      var button = event.relatedTarget;
      var title = button.getAttribute('data-title');
      var desc = button.getAttribute('data-desc');
      var img = button.getAttribute('data-img');

      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalDesc').textContent = desc;
      document.getElementById('modalImg').src = img;
    });
  }

  function showAlert(message, type){
    var a = $('#formAlert');
    a.removeClass();
    a.addClass('alert alert-'+type);
    a.text(message);
    a.fadeIn(200).delay(3000).fadeOut(600);
  }

  // Smooth nav link collapsing
  $('a.nav-link').on('click', function(){
    $('.navbar-collapse').collapse('hide');
  });

  // Tilt effect
  $('.card-project').on('mousemove', function(e){
    var card = $(this);
    var rect = this.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var cx = rect.width/2;
    var cy = rect.height/2;
    var dx = (x-cx)/cx;
    var dy = (y-cy)/cy;
    card.css('transform','perspective(800px) rotateX(' + (-dy*4) + 'deg) rotateY(' + (dx*6) + 'deg) translateY(-6px)');
  }).on('mouseleave', function(){
    $(this).css('transform','translateY(0)');
  });

  // Respect reduced motion
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('.retro-layer > div').forEach(el => el.style.animation = 'none');
  }
});
