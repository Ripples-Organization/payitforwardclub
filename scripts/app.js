var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('menu-hidden');
    mobileMenu.classList.toggle('menu-visible');
});