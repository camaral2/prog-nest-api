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
}
