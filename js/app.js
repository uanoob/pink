"use strict";

var mainMenu = document.querySelector(".main-nav__wrapper");
var toggleBtn = document.querySelector(".main-nav__toggle");
var closeBtn = document.querySelector(".main-nav__close");

closeBtn.addEventListener("click", toggleMenu);
toggleBtn.addEventListener("click", toggleMenu);

mainMenu.classList.add("hide-menu");
closeBtn.classList.add("hide-menu");
toggleBtn.classList.remove("hide-menu");

function toggleMenu() {
  mainMenu.classList.toggle("hide-menu");
  toggleBtn.classList.toggle("hide-menu");
  closeBtn.classList.toggle("hide-menu");
}
//# sourceMappingURL=app.js.map
