import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Produto, ProdutoSchema } from './schemas/produto.schema';
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
