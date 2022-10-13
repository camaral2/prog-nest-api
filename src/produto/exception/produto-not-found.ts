import { HttpException, HttpStatus } from '@nestjs/common';

export class ProdutoNotFound extends HttpException {
  constructor() {
    super('Produto not found!', HttpStatus.NOT_FOUND);
  }
}
