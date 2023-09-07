const filterButtons = document.querySelectorAll(".filterBtnContainer button");
const filterableCards = document.querySelectorAll(".gallery div");
const filterCards = (e) => {
  const activeFilter = document.querySelector(".active");

  activeFilter.classList.remove("active");

  e.target.classList.add("active");

  filterableCards.forEach((card) => {
    card.classList.add("hide");

    if (
      card.dataset.name === e.target.dataset.name ||
      e.target.dataset.name == "all"
    ) {
      card.classList.remove("hide");
    }
  });
};

filterButtons.forEach((button) =>
  button.addEventListener("click", filterCards)
);
