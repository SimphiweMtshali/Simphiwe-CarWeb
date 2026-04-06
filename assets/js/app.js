document.addEventListener("DOMContentLoaded", function () {
  var menuButton = document.getElementById("hamburguer");
  var mainNav = document.getElementById("main-nav");

  if (!menuButton || !mainNav) {
    return;
  }

  function syncNavigationForViewport() {
    if (window.innerWidth >= 583) {
      mainNav.classList.remove("is-open");
      mainNav.removeAttribute("aria-hidden");
      menuButton.setAttribute("aria-expanded", "true");
      return;
    }

    var isOpen = mainNav.classList.contains("is-open");
    mainNav.setAttribute("aria-hidden", String(!isOpen));
    menuButton.setAttribute("aria-expanded", String(isOpen));
  }

  menuButton.setAttribute("aria-controls", "main-nav");
  menuButton.setAttribute("aria-label", "Toggle navigation menu");

  menuButton.addEventListener("click", function () {
    if (window.innerWidth >= 583) {
      return;
    }

    mainNav.classList.toggle("is-open");

    var isOpen = mainNav.classList.contains("is-open");
    mainNav.setAttribute("aria-hidden", String(!isOpen));
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  window.addEventListener("resize", syncNavigationForViewport);
  syncNavigationForViewport();
});
