(function () {
  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  root.dataset.theme = initialTheme;

  function updateThemeLabel() {
    if (!themeToggle) return;
    const isDark = root.dataset.theme === "dark";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  updateThemeLabel();

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = nextTheme;
      localStorage.setItem("theme", nextTheme);
      updateThemeLabel();
    });
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = document.body.classList.toggle("menu-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.addEventListener("click", function (event) {
      if (event.target instanceof HTMLAnchorElement) {
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("visible");
    });
  }

  document.querySelectorAll(".contact-form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const note = form.querySelector(".form-note");
      if (note) {
        note.textContent = "Thanks. This demo form is UI only, so no message was sent.";
      }
    });
  });
})();
