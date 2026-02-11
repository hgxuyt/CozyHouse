(function() {
  'use strict';

  // ----- Header scroll -----
  var header = document.querySelector('.header');
  if (header) {
    var lastScroll = 0;
    function onScroll() {
      var top = window.pageYOffset || document.documentElement.scrollTop;
      if (top > 60) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
      lastScroll = top;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ----- Burger menu -----
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function() {
      burger.classList.toggle('open');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    nav.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        burger.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ----- Scroll-triggered animations -----
  var animated = document.querySelectorAll('.animate-on-scroll');
  if (animated.length) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });
    animated.forEach(function(el) { observer.observe(el); });
  }

  // ----- Catalog filters (только если каталог со старыми .card — на catalog.html используется catalog.js) -----
  var filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  var catalogGrid = document.getElementById('catalog-grid');
  var hasOldCards = catalogGrid && catalogGrid.querySelectorAll('.card').length > 0;
  if (filterBtns.length && catalogGrid && hasOldCards) {
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var filter = this.getAttribute('data-filter');
        filterBtns.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        var cards = catalogGrid.querySelectorAll('.card');
        cards.forEach(function(card) {
          var type = card.getAttribute('data-type');
          var show = filter === 'all' || type === filter;
          card.style.display = show ? '' : 'none';
          if (show) card.classList.add('visible');
        });
      });
    });
  }

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    var href = anchor.getAttribute('href');
    if (href === '#') return;
    var target = document.querySelector(href);
    if (target) {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  });
})();
