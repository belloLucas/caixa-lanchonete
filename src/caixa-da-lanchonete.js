"use strict";

class CaixaDaLanchonete {
  constructor() {
    this.cardapio = [
      { codigo: "cafe", descricao: "Café", valor: 3.0 },
      {
        codigo: "chantily",
        descricao: "Chantily (extra do Café)",
        valor: 1.5,
        codigoItemPrincipal: "cafe",
      },
      { codigo: "suco", descricao: "Suco Natural", valor: 6.2 },
      { codigo: "sanduiche", descricao: "Sanduíche", valor: 6.5 },
      {
        codigo: "queijo",
        descricao: "Queijo (extra do sanduíche)",
        valor: 2.0,
        codigoItemPrincipal: "sanduiche",
      },
      { codigo: "salgado", descricao: "Salgado", valor: 7.25 },
      { codigo: "combo1", descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
      { codigo: "combo2", descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    ];

    this.metodosDePagamento = ["dinheiro", "debito", "credito"];
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    //Separando Itens e quantidades em valores individuais
    const itensDivididos = [];
    for (let i = 0; i < itens.length; i++) {
      const itemInfo = itens[i].split(",");
      itensDivididos.push(itemInfo[0]);
      itensDivididos.push(itemInfo[1]);
    }

    //Passando as quantidades para o array quantidade, e os itens para o array itensSemQuantidade
    const quantidade = [];
    const itensSemQuantidade = [];
    for (let i = 0; i < itensDivididos.length; i += 2) {
      itensSemQuantidade.push(itensDivididos[i]);
      quantidade.push(itensDivididos[i + 1]);
    }

    //Montando pedido
    const pedido = [];
    for (let i = 0; i < itensSemQuantidade.length; i++) {
      pedido.push({
        item: itensSemQuantidade[i],
        quantidade: Number(quantidade[i]),
      });
    }

    //Separando itens principais e extras em arrays diferentes, para poder comparar
    const itensPrincipais = [];
    const itensExtras = [];
    for (const itemPedido of pedido) {
      const itemCardapio = this.cardapio.find(
        (item) => item.codigo === itemPedido.item
      );

      if (itemCardapio) {
        if (itemCardapio.descricao.includes("extra")) {
          itensExtras.push(itemPedido);
        } else {
          itensPrincipais.push(itemPedido);
        }
      }
    }

    //Comparação para saber se o item extra no pedido está acompanhado do seu respectivo item principal
    for (let i = 0; i < itensExtras.length; i++) {
      const extra = this.cardapio.find(
        (item) => item.codigo === itensExtras[i].item
      );

      const principal = this.cardapio.find(
        (item) => item.codigo === extra.codigoItemPrincipal
      );

      const itemPrincipalNoPedido = itensPrincipais.find(
        (item) => item.item === principal.codigo
      );

      if (!itemPrincipalNoPedido) {
        return "Item extra não pode ser pedido sem o principal";
      }
    }

    //Calculando o valor do pedido
    let valorTotal = 0;
    for (const itemPedido of pedido) {
      const itemCardapio = this.cardapio.find(
        (item) => item.codigo === itemPedido.item
      );

      if (itemCardapio) {
        valorTotal += itemCardapio.valor * itemPedido.quantidade;
      } else {
        return "Item inválido!";
      }
    }

    //Adicionando desconto ou acréscimo, com base no método de pagamento
    if (metodoDePagamento === "credito") {
      valorTotal *= 1.03;
    } else if (metodoDePagamento === "dinheiro") {
      valorTotal *= 0.95;
    }

    valorTotal = parseFloat(valorTotal.toFixed(2));

    console.log(valorTotal);

    function formatandoValor(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }

    //Checking possible
    if (itens <= 0) {
      return "Não há itens no carrinho de compra!";
    } else if (quantidade <= 0) {
      return "Quantidade inválida!";
    }

    if (
      metodoDePagamento != "dinheiro" &&
      metodoDePagamento != "credito" &&
      metodoDePagamento != "debito"
    ) {
      return "Forma de pagamento inválida!";
    }

    return formatandoValor(valorTotal);
  }
}

export { CaixaDaLanchonete };
