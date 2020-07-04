import Search from "./modules/search";

if (document.querySelector(".header-search-icon")) {
  new Search();
}

function readMore(title) {
  let dots = document.querySelector(`.content[data-id="${title}"] .dots`);
  let moreText = document.querySelector(`.content[data-id="${title}"] .more`);
  let btnText = document.querySelector(
    `.content[data-id="${title}"] .read-more`
  );

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.textContent = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.textContent = "Read less";
    moreText.style.display = "inline";
  }
}

document.querySelectorAll(".read-more").forEach((elem) => {
  elem.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e.target.dataset.id);
    let dots = document.querySelector(
      `.content[data-id="${e.target.dataset.id}"] .dots`
    );
    let moreText = document.querySelector(
      `.content[data-id="${e.target.dataset.id}"] .more`
    );
    let btnText = document.querySelector(
      `.read-more[data-id="${e.target.dataset.id}"]`
    );

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.textContent = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.textContent = "Read less";
      moreText.style.display = "inline";
    }
  });
});
