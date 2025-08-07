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

// Este é o código completo da última resposta.
// Ele já faz o carrossel ser automático E manual.
document.addEventListener('DOMContentLoaded', () => {

    // Função que inicializa um carrossel específico
    const setupCarousel = (carouselContainer, prevButton, nextButton) => {
        const getScrollAmount = () => {
            const firstItem = carouselContainer.querySelector('.product');
            if (!firstItem) return 0;
            return firstItem.offsetWidth + 22;
        };

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                carouselContainer.scrollBy({
                    left: getScrollAmount(),
                    behavior: 'smooth'
                });
                resetAutoSlide();
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                carouselContainer.scrollBy({
                    left: -getScrollAmount(),
                    behavior: 'smooth'
                });
                resetAutoSlide();
            });
        }
        
        // --- Lógica do Autoplay ---
        let autoSlideInterval;
        const startAutoSlide = () => {
            return setInterval(() => {
                const scrollAmount = getScrollAmount();
                if (carouselContainer.scrollLeft + carouselContainer.offsetWidth >= carouselContainer.scrollWidth) {
                    carouselContainer.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    carouselContainer.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                }
            }, 4000);
        };

        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            autoSlideInterval = startAutoSlide();
        };

        autoSlideInterval = startAutoSlide();
        
        // --- Eventos de reset ---
        carouselContainer.addEventListener('touchstart', resetAutoSlide, { passive: true });
        carouselContainer.addEventListener('mousedown', resetAutoSlide);
        carouselContainer.addEventListener('wheel', resetAutoSlide);
        nextButton.addEventListener('click', resetAutoSlide);
        prevButton.addEventListener('click', resetAutoSlide);
    };

    // Encontra todos os botões e inicializa os carrosséis
    const prevButtons = document.querySelectorAll('.prev-button');
    const nextButtons = document.querySelectorAll('.next-button');

    prevButtons.forEach(button => {
        const targetId = button.dataset.target;
        const carousel = document.getElementById(targetId).querySelector('.carousel-container');
        const nextButton = document.querySelector(`.next-button[data-target="${targetId}"]`);
        
        if (carousel) {
            setupCarousel(carousel, button, nextButton);
        }
    });

});