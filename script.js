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


  const wrapper = document.getElementById("carousel-wrapper");
  const list = document.getElementById("carousel-list");

  let scrollAmount = 0;
  let scrollStep = 0;

  function updateScrollStep() {
    const larguraProduto = wrapper.clientWidth;
    if (window.innerWidth < 768) {
      scrollStep = larguraProduto / 1;
    } else if (window.innerWidth < 1024) {
      scrollStep = larguraProduto / 2;
    } else {
      scrollStep = larguraProduto / 3;
    }
  }

  updateScrollStep();
  window.addEventListener("resize", updateScrollStep);

  function autoScroll() {
    scrollAmount += scrollStep;

    if (scrollAmount >= list.scrollWidth - wrapper.clientWidth) {
      scrollAmount = 0;
    }

    wrapper.scrollTo({
      left: scrollAmount,
      behavior: "smooth"
    });
  }

  setInterval(autoScroll, 6000);
