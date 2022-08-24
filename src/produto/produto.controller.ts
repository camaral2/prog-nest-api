import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProdutoService } from './produto.service';

interface produtoDto {
  id: number;
  description: string;
}

@Controller('produto')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}

  @Get()
  getProdutos() {
    return this.produtoService.getProdutos();
  }

  @Get(':id')
  getProduto(@Param() params) {
    console.log('id:', params.id);
    return this.produtoService.getProdutos().find((t) => t.id === params.id);
  }

  @Post()
  addProduto(@Body() produto: produtoDto) {
    console.log('produto:', produto);
    return this.produtoService.addProduto(produto);
  }
}
