import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
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
} from '@nestjs/swagger';

//import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@ApiBearerAuth()
@ApiTags('articles')
@Controller('produto')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}

  @ApiOperation({ summary: 'Get all produto' })
  @ApiResponse({ status: 200, description: 'Return all produto.' })
  @Get()
  async getProdutos() {
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
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @Post()
  async addProduto(@Res() res, @Body() createProdutoDTO: CreateProdutoDTO) {
    const newProd = await this.produtoService.addProduto(createProdutoDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Produto has been created successfully!',
      produto: newProd,
    });
  }
}
