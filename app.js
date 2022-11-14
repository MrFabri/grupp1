const mainNav = document.querySelector('.main-nav');
const nav = document.querySelector('.main-nav-toggle');

nav.addEventListener('click', ()=> {
    mainNav.classList.toggle('open');
});