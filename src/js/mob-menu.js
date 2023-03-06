

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const bodyScroll = document.querySelector('body');

menuBtn.addEventListener('click', function () {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;

  menuBtn.classList.toggle('inActions');
  menuBtn.setAttribute('aria-expanded', !expanded);

  menu.classList.toggle('inActions');
  bodyScroll.classList.toggle('body-scroll');
});

// ------------------------------------------------------
// const currentPage = window.location.pathname;
// const home = document.getElementById('home-link');
// const favorite = document.getElementById('favorite-link');
// const read = document.getElementById('read-link');

// if (currentPage.includes('/index.html')) {
//   home.classList.add('current');
// } else if (currentPage.includes('/favorite.html')) {
//   favorite.classList.add('current');
// } else if (currentPage.includes('/read.html')) {
//   read.classList.add('current');
// }
// console.log(currentPage);
