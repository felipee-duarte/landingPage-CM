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

const track = document.getElementById('carrossel-track');
const isDesktop = window.innerWidth >= 768;

// Lista de imagens com versões mobile e desktop
const imagens = [
  { mobile: 'assets/boticario-1P.png', desktop: 'assets/boticario-1G.png' },
  { mobile: 'assets/boticario-2P.png', desktop: 'assets/boticario-2G.png' },
  { mobile: 'assets/boticario-3P.png', desktop: 'assets/boticario-3G.png' }
];

// Preenche as imagens no carrossel
function carregarImagens() {
  track.innerHTML = ''; // limpa tudo

  imagens.forEach((imgObj) => {
    const div = document.createElement('div');
    div.classList.add('item');

    const img = document.createElement('img');
    img.src = isDesktop ? imgObj.desktop : imgObj.mobile;

    div.appendChild(img);
    track.appendChild(div);
  });

  // Clona para efeito infinito
  imagens.forEach((imgObj) => {
    const div = document.createElement('div');
    div.classList.add('item');

    const img = document.createElement('img');
    img.src = isDesktop ? imgObj.desktop : imgObj.mobile;

    div.appendChild(img);
    track.appendChild(div);
  });
}

carregarImagens();

// Lógica do carrossel automático
let index = 0;
let total = imagens.length;
let intervalo = 6000;

function slide() {
  index++;
  const porcentagem = isDesktop ? 33.3333 : 100;
  track.style.transform = `translateX(-${porcentagem * index}vw)`;

  if (index >= total) {
    setTimeout(() => {
      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';
      index = 0;
    }, 500);

    setTimeout(() => {
      track.style.transition = 'transform 0.5s ease-in-out';
    }, 600);
  }
}

setInterval(slide, intervalo);

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

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});
