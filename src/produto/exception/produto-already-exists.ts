import { HttpException, HttpStatus } from '@nestjs/common';

export class ProdutoAlreadyExists extends HttpException {
  constructor() {
    super('Produto already exists!', HttpStatus.BAD_REQUEST);
  }
}
