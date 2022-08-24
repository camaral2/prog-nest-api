import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdutoService {
  produtos = [
    { id: 1, description: 'Mouse' },
    { id: 2, description: 'Keyboard' },
  ];

  getProdutos() {
    return this.produtos;
  }

  addProduto(produto) {
    this.produtos = [...this.produtos, { ...produto }];
    return this.produtos.find((t) => t.id === produto.id);
  }
}
