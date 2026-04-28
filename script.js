/* =============================================
   PORTFOLIO — script.js
   Cybersecurity Analyst
   ============================================= */


var heroName = document.getElementById('heroName');
var fullName  = 'Lucas Pizarro'; // 
var idx = 0;

function type() {
  if (idx <= fullName.length) {
    heroName.innerHTML = fullName.slice(0, idx) + '<span class="blink"></span>';
    idx++;
    setTimeout(type, 100);
  }
}
setTimeout(type, 600); // demora de 600ms antes de empezar


/* =====================
   CAROUSEL — Proyectos
   3 slides con autoplay, controles y swipe
===================== */
var cur   = 0;
var TOTAL = 3; // cantidad de slides

var track   = document.getElementById('cTrack');
var dots    = document.querySelectorAll('.c-dot');
var items   = document.querySelectorAll('.proy-item');
var counter = document.getElementById('cCurrent');

function goTo(n) {
  cur = (n + TOTAL) % TOTAL;

  // mover el track
  track.style.transform = 'translateX(-' + (cur * 100) + '%)';

  // actualizar dots
  dots.forEach(function(d, i) {
    d.classList.toggle('active', i === cur);
  });

  // resaltar el proyecto activo en la lista izquierda
  items.forEach(function(it, i) {
    it.classList.toggle('active', i === cur);
  });

  // actualizar contador 01/03
  counter.textContent = String(cur + 1).padStart(2, '0');
}

// Botones siguiente / anterior
document.getElementById('cNext').addEventListener('click', function() { goTo(cur + 1); });
document.getElementById('cPrev').addEventListener('click', function() { goTo(cur - 1); });

// Click en dots
dots.forEach(function(d) {
  d.addEventListener('click', function() { goTo(+d.dataset.i); });
});

// Click en items de la lista izquierda
items.forEach(function(it) {
  it.addEventListener('click', function() { goTo(+it.dataset.slide); });
});

// Autoplay cada 4.5 segundos
var autoplay = setInterval(function() { goTo(cur + 1); }, 4500);

// Pausar autoplay al hacer hover
var tw = document.querySelector('.carousel-track-wrap');
tw.addEventListener('mouseenter', function() { clearInterval(autoplay); });
tw.addEventListener('mouseleave', function() {
  autoplay = setInterval(function() { goTo(cur + 1); }, 4500);
});

// Soporte swipe (móvil)
var touchX = 0;
tw.addEventListener('touchstart', function(e) {
  touchX = e.touches[0].clientX;
});
tw.addEventListener('touchend', function(e) {
  var diff = touchX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) {
    goTo(diff > 0 ? cur + 1 : cur - 1);
  }
});


/* =====================
   SCROLL REVEAL
   Anima secciones al entrar en pantalla
===================== */
var revEls = document.querySelectorAll('.reveal');

var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

revEls.forEach(function(el) { observer.observe(el); });


/* =====================
   NAVBAR — sombra al hacer scroll
===================== */
var navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
  if (window.scrollY > 40) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});


/* =====================
   CAROUSEL — Laboratorio
   Igual al de proyectos pero independiente
===================== */
var labCur   = 0;
var LAB_TOTAL = 3;

var labTrack   = document.getElementById('labTrack');
var labDots    = document.querySelectorAll('.lab-dot');
var labCounter = document.getElementById('labCurrent');

function labGoTo(n) {
  labCur = (n + LAB_TOTAL) % LAB_TOTAL;
  labTrack.style.transform = 'translateX(-' + (labCur * 100) + '%)';
  labDots.forEach(function(d, i) {
    d.classList.toggle('active', i === labCur);
  });
  labCounter.textContent = String(labCur + 1).padStart(2, '0');
}

document.getElementById('labNext').addEventListener('click', function() { labGoTo(labCur + 1); });
document.getElementById('labPrev').addEventListener('click', function() { labGoTo(labCur - 1); });
labDots.forEach(function(d) {
  d.addEventListener('click', function() { labGoTo(+d.dataset.i); });
});

/* autoplay lab */
var labAutoplay = setInterval(function() { labGoTo(labCur + 1); }, 5000);
var labWrap = document.querySelector('.lab-carousel-wrap');
if (labWrap) {
  labWrap.addEventListener('mouseenter', function() { clearInterval(labAutoplay); });
  labWrap.addEventListener('mouseleave', function() {
    labAutoplay = setInterval(function() { labGoTo(labCur + 1); }, 5000);
  });
  /* swipe móvil lab */
  var labTouchX = 0;
  labWrap.addEventListener('touchstart', function(e) { labTouchX = e.touches[0].clientX; });
  labWrap.addEventListener('touchend', function(e) {
    var diff = labTouchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) labGoTo(diff > 0 ? labCur + 1 : labCur - 1);
  });
}
