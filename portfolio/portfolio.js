const portfolioImg = [];

// Create objects for the "graphic" category (17 images)
for (let i = 1; i <= 17; i++) {
  portfolioImg.push({
    src: `./assets/graphic ${i}.webp`,
    dataset: "graphic",
  });
}

// Create objects for the "uiux" category (8 images)
for (let i = 1; i <= 8; i++) {
  portfolioImg.push({
    src: `./assets/uiux ${i}.webp`,
    dataset: "uiux",
  });
}

// Create objects for the "photoshop" category (4 images)
for (let i = 1; i <= 4; i++) {
  portfolioImg.push({
    src: `./assets/photoshop ${i}.webp`,
    dataset: "photoshop",
  });
}

const gallery = document.querySelector(".gallery");
portfolioImg.forEach((data) => {
  const html = `
    <div  data-name="${data.dataset}">
<a data-lightbox="models" data-title="" href="${data.src}">
<img src="${data.src}" alt="" />
</a>
    </div>
  `;

  gallery.insertAdjacentHTML("beforeend", html);
});

// filter algorithm

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

// animation
