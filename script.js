const produtos = [
  { nome: "Ovo Caribe", foto: "ovo_carbie.webp", preco: 59.90 },
  { nome: "Ovo Bis", foto: "ovo_bis.webp", preco: 199.90 },
  { nome: "Ovo Lacta", foto: "ovo_lacta.webp", preco: 149.00 },
  { nome: "Ovo Oreo", foto: "ovo_oreo.webp", preco: 39.90 },
  { nome: "Ovo Diamante Negro", foto: "ovo_diamate.webp", preco: 129.50 }
];

const container = document.getElementById("produtos");
const carrinhoLista = document.getElementById("carrinho");
const carrinhoConteudo = document.getElementById("carrinho-conteudo");
const toggleCarrinhoBtn = document.getElementById("toggle-carrinho");
const totalEl = document.getElementById("total");

const selecionados = [0, 2, 4];
const carrinho = {};

// Adiciona produtos na vitrine
selecionados.forEach(indice => {
  const produto = produtos[indice];

  const caixa = document.createElement("div");
  caixa.className = "produto";

  caixa.innerHTML = `
    <img src="${produto.foto}" alt="${produto.nome}">
    <h2>${produto.nome}</h2>
    <p>R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
    <button class="adicionar-carrinho">Adicionar ao carrinho</button>
  `;

  const botao = caixa.querySelector(".adicionar-carrinho");
  botao.addEventListener("click", () => {
    if (!carrinho[produto.nome]) {
      carrinho[produto.nome] = { ...produto, quantidade: 1 };
    } else {
      carrinho[produto.nome].quantidade++;
    }
    renderizarCarrinho();
  });

  container.appendChild(caixa);
});

// Abrir/fechar carrinho
toggleCarrinhoBtn.addEventListener("click", () => {
  carrinhoConteudo.classList.toggle("aberto");
});

// Atualizar carrinho
function renderizarCarrinho() {
  carrinhoLista.innerHTML = "";
  let total = 0;

  Object.values(carrinho).forEach(produto => {
    const item = document.createElement("li");

    const topo = document.createElement("div");
    topo.className = "item-carrinho-topo";

    const info = document.createElement("div");
    info.className = "item-carrinho-info";

    const imagem = document.createElement("img");
    imagem.src = produto.foto;
    imagem.alt = produto.nome;

    const texto = document.createElement("span");
    texto.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2).replace('.', ',')}`;

    info.appendChild(imagem);
    info.appendChild(texto);

    const remover = document.createElement("button");
    remover.textContent = "X";
    remover.className = "remover-item";
    remover.onclick = () => {
      delete carrinho[produto.nome];
      renderizarCarrinho();
    };

    topo.appendChild(info);
    topo.appendChild(remover);

    const contador = document.createElement("div");
    contador.className = "contador";

    const menos = document.createElement("button");
    menos.textContent = "-";
    menos.className = "remover";
    menos.onclick = () => {
      produto.quantidade--;
      if (produto.quantidade <= 0) {
        delete carrinho[produto.nome];
      }
      renderizarCarrinho();
    };

    const qtd = document.createElement("span");
    qtd.textContent = produto.quantidade;

    const mais = document.createElement("button");
    mais.textContent = "+";
    mais.className = "adicionar";
    mais.onclick = () => {
      produto.quantidade++;
      renderizarCarrinho();
    };

    contador.appendChild(menos);
    contador.appendChild(qtd);
    contador.appendChild(mais);

    item.appendChild(topo);
    item.appendChild(contador);
    carrinhoLista.appendChild(item);

    total += produto.preco * produto.quantidade;
  });

  totalEl.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}
