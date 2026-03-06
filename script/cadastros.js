// ===============================
// ESTADO
// ===============================

let produtos = [];
let caixas = [];
let clientes = [];
let plasticos = [];
let fitas = [];
let etiquetas = [];

let tipoAtual = null;

// ===============================
// ABAS
// ===============================

function trocarAba(event, aba) {
    document.getElementById("produtosSection").style.display = "none";
    document.getElementById("materiaisSection").style.display = "none";
    document.getElementById("clientesSection").style.display = "none";

    document.querySelectorAll(".tabs button").forEach(btn => btn.classList.remove("active"));

    if (aba === "produtos") {
        document.getElementById("produtosSection").style.display = "block";
    }
    if (aba === "materiais") {
        document.getElementById("materiaisSection").style.display = "block";
    }
    if (aba === "clientes") {
        document.getElementById("clientesSection").style.display = "block";
    }

    event.target.classList.add("active");
}

// ===============================
// MODAL DINÂMICO
// ===============================


function abrirModal(tipo) {
    tipoAtual = tipo;
    document.getElementById("modal").style.display = "flex";
    const body = document.getElementById("modalBody");
    body.innerHTML = "";

    if (tipo === "produto") {
        document.getElementById("modalTitulo").innerText = "Novo Produto";

        body.innerHTML = `
    <div class="form-group">
      <label>Nome</label>
      <input id="nome">
    </div>

    <div class="form-group">
      <label>Marca</label>
      <input id="marca">
    </div>

    <div class="row">
      <div class="form-group">
        <label>Custo (R$)</label>
        <input type="number" id="custo" oninput="calcularCustoMl()">
      </div>

      <div class="form-group">
        <label>Tamanho (ml)</label>
        <input type="number" id="volume" oninput="calcularCustoMl()">
      </div>
    </div>

    <div class="custo-ml">
      Custo/ml: <span id="resultadoCusto">R$ 0.00</span>
    </div>
  `;
    }

    if (tipo === "caixa") {
        document.getElementById("modalTitulo").innerText = "Nova Caixa";
        body.innerHTML = `
      <div class="form-group">
        <label>Tipo</label>
        <select id="tipoCaixa">
          <option>PP</option>
          <option>P</option>
          <option>M</option>
          <option>G</option>
        </select>
      </div>
      <div class="form-group">
        <label>Dimensões (cm)</label>
        <input placeholder="Comprimento" id="comp">
        <input placeholder="Largura" id="larg">
        <input placeholder="Altura" id="alt">
      </div>
      <div class="form-group">
        <label>Plástico Bolha (cm)</label>
        <input type="number" id="bolha">
      </div>
      <div class="form-group">
        <label>Fita (cm)</label>
        <input type="number" id="fita">
      </div>
      <div class="form-group">
        <label>Etiqueta (un)</label>
        <input type="number" id="etiqueta">
      </div>
      <div class="form-group">
        <label>Custo Caixa (R$)</label>
        <input type="number" id="custoCaixa">
      </div>
    `;
    }

    if (tipo === "plastico") {

  document.getElementById("modalTitulo").innerText = "Plástico Bolha";

  body.innerHTML = `

  <div class="form-group">
    <label>Comprimento usado na embalagem (cm)</label>
    <input type="number" id="comprimentoBolha">
  </div>

  <div class="form-group">
    <label>Tamanho do rolo (m)</label>
    <input type="number" id="metrosBolha" oninput="calcularBolha()">
  </div>

  <div class="form-group">
    <label>Valor do rolo (R$)</label>
    <input type="number" id="valorBolha" oninput="calcularBolha()">
  </div>

  <div class="custo-ml">
    Custo por cm: <span id="resultadoBolha">R$ 0.0000</span>
  </div>

  `;

}

if (tipo === "fita") {

document.getElementById("modalTitulo").innerText = "Fita Adesiva";

body.innerHTML = `

<div class="form-group">
<label>Comprimento usado na embalagem (mm)</label>
<input type="number" id="comprimentoFita">
</div>

<div class="form-group">
<label>Tamanho do rolo (m)</label>
<input type="number" id="metrosFita" oninput="calcularFita()">
</div>

<div class="form-group">
<label>Valor do rolo (R$)</label>
<input type="number" id="valorFita" oninput="calcularFita()">
</div>

<div class="custo-ml">
Custo por cm: <span id="resultadoFita">R$ 0.0000</span>
</div>

`;
}

if (tipo === "etiqueta") {

document.getElementById("modalTitulo").innerText = "Etiqueta Adesiva";

body.innerHTML = `

<div class="form-group">
<label>Quantidade (un)</label>
<input type="number" id="quantidadeEtiqueta" oninput="calcularEtiqueta()">
</div>

<div class="form-group">
<label>Valor do pacote (R$)</label>
<input type="number" id="valorEtiqueta" oninput="calcularEtiqueta()">
</div>

<div class="custo-ml">
Custo por unidade: <span id="resultadoEtiqueta">R$ 0.0000</span>
</div>

`;

}

    if (tipo === "cliente") {
        document.getElementById("modalTitulo").innerText = "Novo Cliente";
        body.innerHTML = `
      <div class="form-group">
        <label>Nome</label>
        <input id="nomeCliente">
      </div>
      <div class="form-group">
        <label>Telefone</label>
        <input id="telefone">
      </div>
      <div class="form-group">
        <label>Endereço</label>
        <input id="endereco">
      </div>
    `;
    }
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

// ===============================
// SALVAR
// ===============================

function salvar() {

  if (tipoAtual === "produto") {

  const nome = document.getElementById("nome").value;
  const marca = document.getElementById("marca").value;
  const custo = parseFloat(document.getElementById("custo").value) || 0;
  const volume = parseFloat(document.getElementById("volume").value) || 0;

  const custoMl = volume > 0 ? (custo / volume) : 0;

  const produto = {
    nome,
    marca,
    custo,
    volume,
    custoMl
  };

  if (editandoIndex !== null) {
    produtos[editandoIndex] = produto;
    editandoIndex = null;
  } else {
    produtos.push(produto);
  }

  renderProdutos();
}

    if (tipoAtual === "caixa") {
        caixas.push({
            tipo: tipoCaixa.value,
            comp: comp.value,
            larg: larg.value,
            alt: alt.value,
            bolha: bolha.value,
            fita: fita.value,
            etiqueta: etiqueta.value,
            custo: custoCaixa.value
        });
        renderCaixas();
    }

    if (tipoAtual === "plastico") {

  const metros = parseFloat(document.getElementById("metrosBolha").value) || 0;
  const valor = parseFloat(document.getElementById("valorBolha").value) || 0;

  const cm = metros * 100;

  const custoCm = cm > 0 ? (valor / cm) : 0;

  plasticos.push({
    comprimento: document.getElementById("comprimentoBolha").value,
    metros,
    valor,
    custoCm
  });

  renderPlasticos();

}

if(tipoAtual === "fita"){

const metros = parseFloat(document.getElementById("metrosFita").value) || 0;
const valor = parseFloat(document.getElementById("valorFita").value) || 0;

const cm = metros * 100;

const custoCm = cm > 0 ? valor / cm : 0;

fitas.push({
metros,
valor,
custoCm
});

renderMateriais();

}

if(tipoAtual === "etiqueta"){

const qtd = parseFloat(document.getElementById("quantidadeEtiqueta").value) || 0;
const valor = parseFloat(document.getElementById("valorEtiqueta").value) || 0;

const custoUn = qtd > 0 ? valor / qtd : 0;

etiquetas.push({
qtd,
valor,
custoUn
});

renderMateriais();

}

    if (tipoAtual === "cliente") {
        clientes.push({
            nome: nomeCliente.value,
            telefone: telefone.value,
            endereco: endereco.value
        });
        renderClientes();
    }

    fecharModal();
}

// ===============================
// RENDER
// ===============================

function calcularCustoMl() {

    const custo = parseFloat(document.getElementById("custo").value) || 0;
    const volume = parseFloat(document.getElementById("volume").value) || 0;

    if (volume <= 0) {
        document.getElementById("resultadoCusto").innerText = "R$ 0.00";
        return;
    }

    const custoMl = (custo / volume).toFixed(2);

    document.getElementById("resultadoCusto").innerText = `R$ ${custoMl}`;
}

function renderProdutos() {

  const lista = document.getElementById("listaProdutos");
  lista.innerHTML = "";

  produtos.forEach((p, index) => {

    lista.innerHTML += `
      <div class="card">

        <div style="display:flex; justify-content:space-between; align-items:center;">
          
          <div>
            <h3>${p.nome}</h3>
            <small>${p.marca}</small>
          </div>

          <div style="display:flex; gap:10px;">
            <button onclick="editarProduto(${index})">✏️</button>
            <button onclick="removerProduto(${index})">🗑️</button>
          </div>

        </div>

        <div class="card-info">
          <div><span>Custo frasco</span><span>R$ ${p.custo}</span></div>
          <div><span>Volume</span><span>${p.volume} ml</span></div>
          <div><span>Custo/ml</span><span class="custo-highlight">R$ ${p.custoMl.toFixed(2)}</span></div>
        </div>

      </div>
    `;

  });

}

function renderMateriais(){

const lista = document.getElementById("listaMateriais");

lista.innerHTML = "";

plasticos.forEach((p,index)=>{

lista.innerHTML += `
<div class="card">

<div style="display:flex; justify-content:space-between;">

<h3>Plástico Bolha</h3>

<div>
<button onclick="removerPlastico(${index})">🗑️</button>
</div>

</div>

<div class="card-info">
<div><span>Tamanho</span><span>${p.metros} m</span></div>
<div><span>Valor</span><span>R$ ${p.valor}</span></div>
<div><span>Custo/cm</span><span class="custo-highlight">R$ ${p.custoCm.toFixed(4)}</span></div>
</div>

</div>
`;

});

fitas.forEach((f,index)=>{

lista.innerHTML += `
<div class="card">

<div style="display:flex; justify-content:space-between;">
<h3>Fita Adesiva</h3>

<div>
<button onclick="removerFita(${index})">🗑️</button>
</div>

</div>

<div class="card-info">
<div><span>Tamanho</span><span>${f.metros} m</span></div>
<div><span>Valor</span><span>R$ ${f.valor}</span></div>
<div><span>Custo/cm</span><span class="custo-highlight">R$ ${f.custoCm.toFixed(4)}</span></div>
</div>

</div>
`;

});

etiquetas.forEach((e,index)=>{

lista.innerHTML += `
<div class="card">

<div style="display:flex; justify-content:space-between;">
<h3>Etiqueta</h3>

<div>
<button onclick="removerEtiqueta(${index})">🗑️</button>
</div>

</div>

<div class="card-info">
<div><span>Quantidade</span><span>${e.qtd} un</span></div>
<div><span>Valor</span><span>R$ ${e.valor}</span></div>
<div><span>Custo/un</span><span class="custo-highlight">R$ ${e.custoUn.toFixed(4)}</span></div>
</div>

</div>
`;

});

}

function renderCaixas() {
    const lista = document.getElementById("listaCaixas");
    lista.innerHTML = "";
    caixas.forEach(c => {
        lista.innerHTML += `
      <div class="card">
        <h3>Caixa ${c.tipo}</h3>
        <div class="card-info">
          <div><span>Dimensões</span><span>${c.comp}x${c.larg}x${c.alt} cm</span></div>
          <div><span>Bolha</span><span>${c.bolha}cm</span></div>
          <div><span>Fita</span><span>${c.fita}cm</span></div>
          <div><span>Etiqueta</span><span>${c.etiqueta} un</span></div>
          <div><span>Custo</span><span class="custo-highlight">R$ ${c.custo}</span></div>
        </div>
      </div>
    `;
    });
}

function renderPlasticos() {

  const lista = document.getElementById("listaCaixas");

  plasticos.forEach(p => {

    lista.innerHTML += `
      <div class="card">
        <h3>Plástico Bolha</h3>

        <div class="card-info">

          <div>
            <span>Tamanho</span>
            <span>${p.metros} m</span>
          </div>

          <div>
            <span>Valor</span>
            <span>R$ ${p.valor}</span>
          </div>

          <div>
            <span>Custo/cm</span>
            <span class="custo-highlight">
              R$ ${p.custoCm.toFixed(4)}
            </span>
          </div>

        </div>
      </div>
    `;

  });

}

function renderClientes() {
    const lista = document.getElementById("listaClientes");
    lista.innerHTML = "";
    clientes.forEach(c => {
        lista.innerHTML += `
      <div class="card">
        <h3>${c.nome}</h3>
        <div class="card-info">
          <div><span>Telefone</span><span>${c.telefone}</span></div>
          <div><span>Endereço</span><span>${c.endereco}</span></div>
        </div>
      </div>
    `;
    });
}

/*REMOVER PRODUTO*/

function removerProduto(index) {

  const confirmar = confirm("Deseja remover este produto?");

  if (!confirmar) return;

  produtos.splice(index, 1);

  renderProdutos();

}

function removerPlastico(i){
plasticos.splice(i,1);
renderMateriais();
}

function removerFita(i){
fitas.splice(i,1);
renderMateriais();
}

function removerEtiqueta(i){
etiquetas.splice(i,1);
renderMateriais();
}

/*EDITAR PRODUTO*/

let editandoIndex = null;

function editarProduto(index) {

  const produto = produtos[index];

  document.getElementById("nome").value = produto.nome;
  document.getElementById("marca").value = produto.marca;
  document.getElementById("custo").value = produto.custo;
  document.getElementById("volume").value = produto.volume;

  calcularCustoMl();

  editandoIndex = index;

  abrirModal("produto");

}

function calcularBolha() {

  const metros = parseFloat(document.getElementById("metrosBolha").value) || 0;
  const valor = parseFloat(document.getElementById("valorBolha").value) || 0;

  const cm = metros * 100;

  if (cm <= 0) {
    document.getElementById("resultadoBolha").innerText = "R$ 0.0000";
    return;
  }

  const custo = valor / cm;

  document.getElementById("resultadoBolha").innerText =
    "R$ " + custo.toFixed(4);

}

function calcularFita(){

const metros = parseFloat(document.getElementById("metrosFita").value) || 0;
const valor = parseFloat(document.getElementById("valorFita").value) || 0;

const cm = metros * 100;

if(cm <= 0){
document.getElementById("resultadoFita").innerText = "R$ 0.0000";
return;
}

const custo = valor / cm;

document.getElementById("resultadoFita").innerText = "R$ " + custo.toFixed(4);

}


function calcularEtiqueta(){

const qtd = parseFloat(document.getElementById("quantidadeEtiqueta").value) || 0;
const valor = parseFloat(document.getElementById("valorEtiqueta").value) || 0;

if(qtd <= 0){
document.getElementById("resultadoEtiqueta").innerText = "R$ 0.0000";
return;
}

const custo = valor / qtd;

document.getElementById("resultadoEtiqueta").innerText = "R$ " + custo.toFixed(4);

}