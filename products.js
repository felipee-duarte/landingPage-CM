const productList = document.getElementById("product-list");

const products = [
  {
    image: "assets-product/code.png",
    tag: "-10%",
    title: "Her Code",
    description: "Kit Presente Especial Her Code (2 itens)",
    oldPrice: "R$299,90",
    newPrice: "R$269,91",
    link: "https://minhaloja.boticario.com.br/cmbeautystore/produto/86206"
  },
  {
    image: "assets-product/lily.png",
    tag: "-11%",
    title: "Lily",
    description: "Lily Lumière Eau de Parfum 75ml",
    oldPrice: "R$309,90",
    newPrice: "R$274,91",
    link: "https://minhaloja.boticario.com.br/cmbeautystore/produto/77989"
  },
  {
    image: "assets-product/gold.png",
    tag: "-15%",
    title: "Coffee",
    description: "perfume coffe",
    oldPrice: "R$199,90",
    newPrice: "R$169,91",
    link: "https://minhaloja.boticario.com.br/cmbeautystore/produto/12345"
  }
];

function renderProducts() {
  productList.innerHTML = "";

  products.forEach(product => {
    productList.innerHTML += `
      <div class="product swiper-slide">
        <div class="image-product">
          <img src="${product.image}" alt="${product.title}">
          ${product.tag ? `<p class="product-tag">${product.tag}</p>` : ""}
        </div>

        <div class="product-content">
          <div class="estrelas">★★★★★</div>
          <h3 class="product-title">${product.title}</h3>
          <p class="product-text">${product.description}</p>

          <div class="product-footer">
            <div class="card-profile">
              ${product.oldPrice ? `<span class="product-promotion">${product.oldPrice}</span>` : ""}
              ${product.newPrice ? `<span class="product-price">${product.newPrice}</span>` : ""}
            </div>

            <a href="${product.link}" target="_blank" class="product-button">
              QUERO✨
            </a>
          </div>
        </div>
      </div>
    `;
  });
}

renderProducts();

const brandsList = document.getElementById("brands-list");

const brands = [
  {
    image: "assets/marca-oBoticario.png",
    link: "https://minhaloja.boticario.com.br/cmbeautystore?utm_source=ab&utm_medium=catalogo&utm_campaign=C202511-Catálogo_Digital_SSP",
    alt: "logo oBoticário"
  },
  {
    image: "assets/marca-O.U.I.png",
    link: "https://minhaloja.ouiparis.com/cmbeautystore?utm_source=ab&utm_medium=catalogo&utm_campaign=C202511",
    alt: "logo O.U.I"
  },
  {
    image: "assets/eudora.png",
    link: "https://minhaloja.eudora.com.br/cmbeautystore?utm_source=ab&utm_medium=catalogo&utm_campaign=C202511",
    alt: "logo Eudora"
  },
  {
    image: "assets/quem disse.png",
    link: "https://minhaloja.quemdisseberenice.com.br/cmbeautystore?utm_source=ab&utm_medium=catalogo&utm_campaign=C202511",
    alt: "logo Quem disse"
  }
];

function renderBrands() {
  brandsList.innerHTML = "";

  brands.forEach(brand => {
    brandsList.innerHTML += `
      <div class="brand">
        <a href="${brand.link}" target="_blank">
          <img src="${brand.image}" alt="${brand.alt}">
        </a>
      </div>
    `;
  });
}

renderBrands();