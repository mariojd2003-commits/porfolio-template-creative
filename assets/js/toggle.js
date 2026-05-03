/* ==========================================================================
   Theme Toggle — Dark / Light Mode
   ========================================================================== */

/* --------------------------------------------------------------------------
   Load saved theme from localStorage
   -------------------------------------------------------------------------- */

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}


/* --------------------------------------------------------------------------
   Theme toggle interaction
   -------------------------------------------------------------------------- */

const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {

    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "light" ? "dark" : "light";

    /* Apply new theme */
    document.documentElement.setAttribute("data-theme", nextTheme);

    /* Persist choice */
    localStorage.setItem("theme", nextTheme);
  });
}