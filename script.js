const header = document.querySelector('header')
const headerOffset = header.offsetTop;

window.addEventListener('scroll', () => {
    if (window.pageYOffset >= headerOffset) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
})

function clickMenu() {
    const menu = document.getElementById('menu'); // <- adiciona essa linha
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

const swiper = new Swiper('.wrapper', {
    loop: true,
    spaceBetween: 30,

    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    navigation: {
        nextE1: '.swiper-button-next',
        prevE1: '.swiper-button-prev',
    },


});

