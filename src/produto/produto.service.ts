import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IProduto } from './interfaces/produto.interfaces';
import { CreateProdutoDTO } from './dto/create-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectModel('Produto') private readonly produtoModel: Model<IProduto>,
  ) {}

  async getProdutos(): Promise<IProduto[]> {
    const produtos = await this.produtoModel.find();
    return produtos;
  }

  async addProduto(createProdutoDTO: CreateProdutoDTO): Promise<IProduto> {
    const newProd = await new this.produtoModel(createProdutoDTO);
    return await newProd.save();
  }
}
