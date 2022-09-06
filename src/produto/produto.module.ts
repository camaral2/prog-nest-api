import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Produto, ProdutoSchema } from './schemas/produto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Produto.name, schema: ProdutoSchema }]),
  ],
  providers: [ProdutoService],
  controllers: [ProdutoController],
})
export class ProdutoModule {}
