(function () {
  "use strict";

  var MOBILE_BREAKPOINT = 900; // debe coincidir con el media query del CSS

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  var navLinks = Array.prototype.slice.call(nav.querySelectorAll("a"));

  /* =========================================
     MENÚ MÓVIL
     ========================================= */

  // Vincula el botón con el menú (accesibilidad)
  if (!nav.id) nav.id = "menu-principal";
  toggle.setAttribute("aria-controls", nav.id);

  function setMenu(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }

  function isOpen() {
    return nav.classList.contains("open");
  }

  toggle.addEventListener("click", function () {
    setMenu(!isOpen());
  });

  // Cierra al hacer clic en un enlace
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  // Cierra con Escape y devuelve el foco al botón
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Cierra al hacer clic fuera del menú
  document.addEventListener("click", function (e) {
    if (isOpen() && !nav.contains(e.target) && !toggle.contains(e.target)) {
      setMenu(false);
    }
  });

  // Cierra al pasar a escritorio
  window.addEventListener("resize", function () {
    if (window.innerWidth > MOBILE_BREAKPOINT && isOpen()) {
      setMenu(false);
    }
  });

  /* =========================================
     ENLACE ACTIVO SEGÚN LA SECCIÓN VISIBLE
     ========================================= */

  if (!("IntersectionObserver" in window)) return;

  // Solo se observan los enlaces cuyo destino existe en la página
  var targets = [];
  navLinks.forEach(function (link) {
    var href = link.getAttribute("href");
    if (!href || href.charAt(0) !== "#" || href.length < 2) return;
    var section = document.querySelector(href);
    if (section) targets.push({ link: link, section: section });
  });

  if (!targets.length) return;

  function setActive(activeLink) {
    navLinks.forEach(function (link) {
      var isActive = link === activeLink;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        for (var i = 0; i < targets.length; i++) {
          if (targets[i].section === entry.target) {
            setActive(targets[i].link);
            break;
          }
        }
      });
    },
    {
      // Una sección se considera activa cuando cruza la franja central,
      // descontando el header sticky
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0
    }
  );

  targets.forEach(function (t) {
    observer.observe(t.section);
  });
})();
