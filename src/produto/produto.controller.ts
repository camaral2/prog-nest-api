import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateProdutoDTO } from '@exmpl/produto/dto/create-produto.dto';
import { ProdutoService } from '@exmpl/produto/produto.service';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { IProduto } from '@exmpl/produto/interfaces/produto.interfaces';
import { ValidationPipe } from '@exmpl/shared/pipes/validation.pipe';

@ApiBearerAuth()
@ApiTags('produto')
@Controller('produto')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}

  @ApiOperation({ description: 'Get All Produto' })
  @ApiResponse({ description: 'Return all produto.' })
  @Get()
  async getProdutos(): Promise<IProduto[]> {
    const produtos = await this.produtoService.getProdutos();
    return produtos;
  }

  @ApiOkResponse({ description: 'The resource was found successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get('/:description')
  async getProduto(
    @Param('description') description: string,
  ): Promise<IProduto> {
    const produto = await this.produtoService.getProduto(description);
    return produto;
  }

  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiCreatedResponse({ description: 'Produto created successfully.' })
  @ApiUnprocessableEntityResponse({
    description: 'Produto description already exists.',
  })
  @UsePipes(new ValidationPipe())
  @Post()
  async addProduto(
    @Body() createProdutoDTO: CreateProdutoDTO,
  ): Promise<IProduto> {
    const newProd = await this.produtoService.addProduto(createProdutoDTO);
    return newProd;
  }

  @ApiOkResponse({ description: 'The resource was deleted successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({
    description: 'Produto description not found.',
  })
  @Delete('/:description')
  async deleteProduto(@Param('description') description: string): Promise<any> {
    return this.produtoService.removeProduto(description);
  }
}
