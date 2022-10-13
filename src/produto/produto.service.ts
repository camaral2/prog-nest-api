import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IProduto } from '@exmpl/produto/interfaces/produto.interfaces';
import { CreateProdutoDTO } from '@exmpl/produto/dto/create-produto.dto';
import { ProdutoAlreadyExists } from '@exmpl/produto/exception/produto-already-exists';
import { ProdutoNotFound } from '@exmpl/produto/exception/produto-not-found';
import logger from '@exmpl/utils/logger';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectModel('Produto') private readonly produtoModel: Model<IProduto>,
  ) {}

  async getProdutos(): Promise<IProduto[]> {
    try {
      const produtos = await this.produtoModel.find().exec();
      return produtos;
    } catch (err) {
      logger.error(`Error: ${err}`);
      throw err;
    }
  }

  async getProduto(description: string): Promise<IProduto> {
    try {
      const produto = await this.produtoModel.findOne({ description });
      if (!produto) throw new ProdutoNotFound();
      return produto;
    } catch (err) {
      logger.error(`Error: ${err} - [${description}]`);
      throw err;
    }
  }

  async addProduto(createProdutoDTO: CreateProdutoDTO): Promise<IProduto> {
    try {
      const existProd = await this.produtoModel
        .findOne({ description: createProdutoDTO.description })
        .exec();

      if (existProd) throw new ProdutoAlreadyExists();

      const newProd = await this.produtoModel.create(createProdutoDTO);
      return newProd;
    } catch (err) {
      logger.error(`Error: ${err} - [${createProdutoDTO.description}]`);
      throw err;
    }
  }
}
