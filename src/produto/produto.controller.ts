import { Controller, Get } from '@nestjs/common';
import { ProdutoService } from './produto.service';

/*interface produtoDto{
  id: string,
  description: string
}*/

@Controller('produto')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}

  @Get()
  getProdutos() {
    return this.produtoService.getProdutos();
  }
}
