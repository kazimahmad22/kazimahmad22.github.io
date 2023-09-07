let mobMenuIcon = document.querySelector(".mobMenuIcon");
let mobMenu = document.querySelector(".mobNavMenu");

mobMenuIcon.addEventListener("click", function () {
  if (mobMenu.style.display === "flex") {
    mobMenu.style.display = "none";
  } else {
    mobMenu.style.display = "flex";
  }
});
