const mainNav = document.querySelector('.main-nav');
const mainNavToggle = document.querySelector('.main-nav-toggle');

mainNavToggle.addEventListener('click', ()=> {
    mainNav.classList.toggle('open');
});