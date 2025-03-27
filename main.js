let mobMenuIcon = document.querySelector(".mobMenuIcon");
let mobMenu = document.querySelector(".mobNavMenu");

mobMenuIcon.addEventListener("click", function () {
  if (mobMenu.style.display === "flex") {
    mobMenu.style.display = "none";
  } else {
    mobMenu.style.display = "flex";
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".mobNavMenu a").forEach((link) => {
  link.addEventListener("click", function () {
    mobMenu.style.display = "none";
  });
});
