// Header Search
const media = window.matchMedia("(min-width: 768px)");
if (media.matches) {
  const searchInput = document.querySelector(".header-search input");

  searchInput.addEventListener("click", () => {
    searchInput.style.width = "100%";
  });
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target)) {
      searchInput.style.width = "100px";
    }
  });
}
if (!media.matches) {
  const dropdownMenu = Array.from(document.querySelectorAll(".nav-item.dropdown"));
  dropdownMenu.map(item => {
    item.addEventListener("click", () => {
      console.log(item.parentNode)
      item.querySelector(".dropdown-menu").classList.toggle("active");
      console.log(item.parentNode.querySelector(".dropdown-menu"))
    })
  })
}

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const headerMain = document.querySelector(".header-main");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  headerMain.classList.toggle("active");
});

