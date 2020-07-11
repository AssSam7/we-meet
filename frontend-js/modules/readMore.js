export default class ReadMore {
  constructor() {
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
  }
}
