const dia = prompt("Bom Dia! Qual seu nome??");
alert(`seja bem vindo(a) ${dia} ao padariaTech`);

class CaixaRegistradora {
  #cliente;
  #productos;
  #caixaItems;
  #dinheiro;
  #troco;

  constructor() {
    this.#cliente = null;
    this.#productos = [];
    this.#caixaItems = [];
    this.#dinheiro = 0;
    this.#troco = 0;
  }

  iniciarAtendimento(cliente) {
    this.#cliente = cliente;
  }

  get cliente() {
    return this.#cliente;
  }

  adicionarCaixaItem(caixaItem) {
    this.#caixaItems.push(caixaItem);
  }

  get caixaItems() {
    return this.#caixaItems;
  }

  adicionarProducto(produto) {
    this.#productos.push(produto);
  }

  get produtos() {
    return this.#productos;
  }

  buscarProducto(codigoBarra) {
    return this.#productos.find((p) => p.codigoBarra === codigoBarra);
  }

  get dinheiro() {
    return this.#dinheiro;
  }

  get troco() {
    return this.#troco;
  }

  valorTotalDaConta() {
    let total = 0;
    this.#caixaItems.forEach((item) => {
      total += item.quantidade * item.produto.preco;
    });
    return total.toFixed(2);
  }

  fecharConta(dinheiro) {
    const total = this.valorTotalDaConta();
    if (dinheiro >= total) {
      this.#dinheiro = parseFloat(dinheiro);
      this.#troco = (this.dinheiro - total).toFixed(2);
      this.imprimirCupom();
    } else {
      console.log("Dinheiro é menor do valor total");
    }
  }

  imprimirCupom() {
    let results = ` Padaria Tech Mega Plus  \n`;
    results += `CLIENTE: R$ ${this.cliente}\n`;
    this.caixaItems.forEach((item) => {
      results += `+ ${item.produto.nome} ${item.quantidade} R$ ${
        item.quantidade * item.produto.preco
      }\n`;
    });
    results += `Total: R$ ${this.valorTotalDaConta()}\n`;
    results += `Dinheiro: R$ ${this.dinheiro}\n`;
    results += `Troco: R$ ${this.troco}\n`;
    console.log(results);
  }
}

class CaixaItem {
  #produto;
  #quantidade;

  constructor(produto, quantidade) {
    this.#produto = produto;
    this.#quantidade = Number(quantidade);
  }

  get produto() {
    return this.#produto;
  }
  get quantidade() {
    return this.#quantidade;
  }
  set produto(produto) {
    this.#produto = produto;
  }
  set quantidade(quantidade) {
    this.#quantidade = Number(quantidade);
  }
}

class Produto {
  #codigoBarra;
  #preco;
  #nome;

  constructor(codigoBarra, preco, nome) {
    this.#codigoBarra = codigoBarra;
    this.#preco = Number(preco);
    this.#nome = nome;
  }

  get codigoBarra() {
    return this.#codigoBarra;
  }
  set codigoBarra(codigoBarra) {
    this.#codigoBarra = codigoBarra;
  }
  get preco() {
    return this.#preco;
  }
  set preco(preco) {
    this.#preco = Number(preco);
  }
  get nome() {
    return this.#nome;
  }
}

function venda1() {
  const dinheiro = 50;
  const caixa = new CaixaRegistradora();
  const produto1 = new Produto("987", 5.9, "Coxinha");
  const produto2 = new Produto("654", 6.5, "Risoles");
  const produto3 = new Produto("321", 3.9, "Café");
  const produto4 = new Produto("321", 8.9, "Pastel");
  caixa.adicionarProducto(produto1);
  caixa.adicionarProducto(produto2);
  caixa.adicionarProducto(produto3);
  caixa.adicionarProducto(produto4);

  caixa.iniciarAtendimento("Henrique");

  const produtoItem1 = caixa.buscarProducto("987");
  const produtoItem2 = caixa.buscarProducto("654");

  caixa.adicionarCaixaItem(new CaixaItem(produtoItem1, 1));
  caixa.adicionarCaixaItem(new CaixaItem(produtoItem2, 4));

  caixa.fecharConta(dinheiro);
}

function venda2() {
  const dinheiro = 100;
  const caixa = new CaixaRegistradora();
  const produto1 = new Produto("123", 11.0, "Pão de Trigo");
  const produto2 = new Produto("456", 7.9, "Pão de Queijo");
  const produto3 = new Produto("789", 9.9, "Solho");
  const produto4 = new Produto("789", 9.9, "Misto Quente");

  caixa.adicionarProducto(produto1);
  caixa.adicionarProducto(produto2);
  caixa.adicionarProducto(produto3);
  caixa.adicionarProducto(produto4);

  caixa.iniciarAtendimento("Nicolas");

  const produtoItem1 = caixa.buscarProducto("123");
  const produtoItem2 = caixa.buscarProducto("789");

  caixa.adicionarCaixaItem(new CaixaItem(produtoItem1, 2));
  caixa.adicionarCaixaItem(new CaixaItem(produtoItem2, 1));

  caixa.fecharConta(dinheiro);
}

venda1();
venda2();
