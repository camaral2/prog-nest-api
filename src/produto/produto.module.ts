import { Module } from '@nestjs/common';
import { ProdutoService } from '@exmpl/produto/produto.service';
import { ProdutoController } from '@exmpl/produto/produto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Produto, ProdutoSchema } from '@exmpl/produto/schemas/produto.schema';
//import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Produto.name, schema: ProdutoSchema }]),
  ],
  providers: [ProdutoService],
  controllers: [ProdutoController],
  exports: [ProdutoService],
})
export class ProdutoModule {}
