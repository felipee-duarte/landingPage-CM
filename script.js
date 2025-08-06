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

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    // Seleciona os itens com a classe 'product'
    const items = Array.from(track.children);
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    // A largura do item é a largura do seu card de produto
    const itemWidth = items[0].getBoundingClientRect().width + 20; // Largura do item + margem

    // Duplica os itens para criar o efeito infinito
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    let currentIndex = 0;
    let autoSlideInterval;
    let isTransitioning = false;

    const moveToSlide = (index) => {
        if (isTransitioning) return;
        isTransitioning = true;

        const newPosition = -index * itemWidth;
        track.style.transform = `translateX(${newPosition}px)`;

        if (index >= items.length) {
            setTimeout(() => {
                track.style.transition = 'none';
                track.style.transform = `translateX(0px)`;
                currentIndex = 0;
                track.offsetWidth; // Força o reflow para aplicar a transição instantânea
                track.style.transition = 'transform 0.5s ease-in-out';
                isTransitioning = false;
            }, 500); // 500ms é a duração da transição no CSS
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    };

    nextButton.addEventListener('click', () => {
        currentIndex++;
        moveToSlide(currentIndex);
        resetAutoSlide();
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex === 0) {
            currentIndex = items.length;
            track.style.transition = 'none';
            track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
            track.offsetWidth; // Força o reflow
        }
        currentIndex--;
        track.style.transition = 'transform 0.5s ease-in-out';
        moveToSlide(currentIndex);
        resetAutoSlide();
    });

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            currentIndex++;
            moveToSlide(currentIndex);
        }, 5000); // Avança a cada 5 segundos
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    startAutoSlide();

    // Lógica para o Swipe (arrastar)
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;

    const dragStart = (e) => {
        isDragging = true;
        startPos = e.pageX || e.touches[0].clientX;
        prevTranslate = currentTranslate;
        track.style.cursor = 'grabbing';
        animationID = requestAnimationFrame(animation);
    };

    const dragEnd = () => {
        isDragging = false;
        track.style.cursor = 'grab';
        cancelAnimationFrame(animationID);
        const movedBy = currentTranslate - prevTranslate;
        if (movedBy < -100) {
            currentIndex++;
        }
        if (movedBy > 100) {
            currentIndex--;
        }
        moveToSlide(currentIndex);
    };

    const dragMove = (e) => {
        if (!isDragging) return;
        const currentPos = e.pageX || e.touches[0].clientX;
        currentTranslate = prevTranslate + currentPos - startPos;
    };

    track.addEventListener('mousedown', dragStart);
    track.addEventListener('touchstart', (e) => { dragStart(e); resetAutoSlide(); });
    track.addEventListener('mouseup', dragEnd);
    track.addEventListener('touchend', dragEnd);
    track.addEventListener('mouseleave', () => {
        if (isDragging) dragEnd();
    });
    track.addEventListener('mousemove', dragMove);
    track.addEventListener('touchmove', dragMove);

    function animation() {
        track.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) requestAnimationFrame(animation);
    }
});
