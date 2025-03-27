// Mobile Menu Functionality
document.addEventListener("DOMContentLoaded", () => {
  const mobMenuIcon = document.querySelector(".mobMenuIcon");
  const mobMenu = document.querySelector(".mobNavMenu");
  const body = document.body;

  if (mobMenuIcon && mobMenu) {
    // Toggle menu
    mobMenuIcon.addEventListener("click", () => {
      mobMenu.classList.toggle("active");
      mobMenuIcon.classList.toggle("active");
      body.style.overflow = mobMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close menu when clicking a link
    const menuLinks = mobMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobMenu.classList.remove("active");
        mobMenuIcon.classList.remove("active");
        body.style.overflow = "";
      });
    });

    // Close menu when clicking outside
    mobMenu.addEventListener("click", (e) => {
      if (e.target === mobMenu) {
        mobMenu.classList.remove("active");
        mobMenuIcon.classList.remove("active");
        body.style.overflow = "";
      }
    });
  }
});
