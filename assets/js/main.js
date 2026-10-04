/* Kalytero — interacciones mínimas
   · header que cambia al hacer scroll
   · menú móvil
   · revelado progresivo (IntersectionObserver)
   · enlace activo según sección
*/
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------ header scroll */
  var header = document.getElementById('header');
  var lastY = -1;

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (y === lastY) return;
    lastY = y;
    header.classList.toggle('is-scrolled', y > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --------------------------------------------------------- menú móvil */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function setMenu(open) {
    document.body.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }

  burger.addEventListener('click', function () {
    setMenu(!document.body.classList.contains('nav-open'));
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* -------------------------------------------------- revelado al scroll */
  /* Barrido propio en vez de IntersectionObserver: así el contenido nunca se
     queda oculto si el usuario baja muy rápido (saltos, anclas, flicks). */
  var pending = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  function show(el) {
    el.classList.add('is-visible');
    var i = pending.indexOf(el);
    if (i > -1) pending.splice(i, 1);
  }

  if (reduce) {
    pending.forEach(show);
  } else {
    var ticking = false;

    function sweep() {
      ticking = false;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var limit = vh * 0.9;

      for (var i = pending.length - 1; i >= 0; i--) {
        var el = pending[i];
        // `top < limit` cubre lo visible y todo lo que ya quedó por encima.
        if (el.getBoundingClientRect().top < limit) show(el);
      }

      if (!pending.length) {
        window.removeEventListener('scroll', request);
        window.removeEventListener('resize', request);
      }
    }

    function request() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(sweep);
    }

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request, { passive: true });

    // Primer barrido tras el layout (y de nuevo al cargar fuentes/imágenes).
    request();
    window.addEventListener('load', request);
    setTimeout(request, 400);
  }

  /* ------------------------------------------------------ nav activa */
  var sections = ['marca', 'negocios', 'criterio', 'contacto']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  var links = Array.prototype.slice.call(nav.querySelectorAll('a'));

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ------------------------------------------------------------ año */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
