import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IProduto } from './interfaces/produto.interfaces';
import { CreateProdutoDTO } from './dto/create-produto.dto';
import { ProdutoAlreadyExists } from './exception/produto-already-exists';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectModel('Produto') private readonly produtoModel: Model<IProduto>,
  ) {}

  async getProdutos(): Promise<IProduto[]> {
    const produtos = await this.produtoModel.find().exec();
    return produtos;
  }

  async addProduto(createProdutoDTO: CreateProdutoDTO): Promise<IProduto> {
    const existProd = await this.produtoModel
      .findOne({ description: createProdutoDTO.description })
      .exec();

    if (existProd) throw new ProdutoAlreadyExists();

    const newProd = await this.produtoModel.create(createProdutoDTO);
    return newProd;
  }
}
