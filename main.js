/* ============================================
   AA SUSCONS LIMITED — main.js
   Animations: scroll reveal, counter, nav shrink,
                image hover zoom, page fade-in
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------
     1. NAVBAR — shrink on scroll + active link
  ------------------------------------------ */
  var nav = document.getElementById('mainNav');
  var navLinks = document.querySelectorAll('.nav-links a');
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      nav.classList.add('shrunk');
    } else {
      nav.classList.remove('shrunk');
    }
    revealOnScroll();
    triggerCounters();
  }, { passive: true });

  /* ------------------------------------------
   2. MOBILE NAV TOGGLE
------------------------------------------ */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
    });

  // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
      });
    });
  }

  /* ------------------------------------------
     3. SCROLL REVEAL
     Elements with class "reveal" fade + slide up
     when they enter the viewport
  ------------------------------------------ */
  function revealOnScroll() {
    var elements = document.querySelectorAll('.reveal');
    elements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });
  }

  /* ------------------------------------------
     4. NUMBER COUNTER ANIMATION
     Finds elements with data-target attribute
     and counts up to that number on scroll
  ------------------------------------------ */
  var countersRun = false;

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1600;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
      el.textContent = Math.round(ease * target) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function triggerCounters() {
    if (countersRun) return;
    var statsBar = document.getElementById('statsBar');
    if (!statsBar) return;

    var rect = statsBar.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      countersRun = true;
      var counters = document.querySelectorAll('[data-target]');
      counters.forEach(animateCount);
    }
  }

  /* ------------------------------------------
     5. PAGE FADE-IN on load
  ------------------------------------------ */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  window.addEventListener('load', function () {
    document.body.style.opacity = '1';
  });

  /* ------------------------------------------
     6. SMOOTH INTERNAL LINK TRANSITIONS
     Fades out before navigating to another page
  ------------------------------------------ */
  var internalLinks = document.querySelectorAll('a[href]');
  internalLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (
      href &&
      !href.startsWith('http') &&
      !href.startsWith('#') &&
      !href.startsWith('mailto') &&
      !href.startsWith('tel')
    ) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.style.opacity = '0';
        setTimeout(function () {
          window.location.href = href;
        }, 400);
      });
    }
  });

  /* ------------------------------------------
     7. INIT — run on page load
  ------------------------------------------ */
  revealOnScroll();
  triggerCounters();

});
