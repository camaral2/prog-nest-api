import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateProdutoDTO } from './dto/create-produto.dto';
import { ProdutoService } from './produto.service';
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
import { IProduto } from './interfaces/produto.interfaces';
//import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@ApiBearerAuth()
@ApiTags('articles')
@Controller('produto')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}

  @ApiTags('produto')
  @ApiOperation({ description: 'Get All Produto' })
  //@UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Get all produto' })
  @ApiResponse({ status: 200, description: 'Return all produto.' })
  @Get()
  async getProdutos(): Promise<IProduto[]> {
    const produtos = await this.produtoService.getProdutos();
    return produtos;
  }

  /*
  @Get('produto/:produtoId')
  async getProduto(@Res() Res, @Param('produtoId') params) {
    //    getProduto(@Res() Res, @Param('produtoId', new ValidateObjectId()) params) {
    const produto = await this.produtoService.getProduto(produtoId);
    console.log('id:', params.id);
    return this.produtoService.getProdutos();
  }
*/
  @ApiOkResponse({ description: 'The resource was inserted successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiCreatedResponse({ description: 'Produto created successfully.' })
  @ApiUnprocessableEntityResponse({
    description: 'Produto title already exists.',
  })
  @Post()
  async addProduto(@Body() createProdutoDTO: CreateProdutoDTO) {
    const newProd = await this.produtoService.addProduto(createProdutoDTO);
    return newProd;
  }
}
