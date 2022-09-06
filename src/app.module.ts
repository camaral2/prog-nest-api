import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/prog-nest-api',
    ),
    ProdutoModule,
  ],
  /*
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/prog-nest-api', {
      useNewUrlParse: true,
      useUnifiedTopology: true,
    }),
    ProdutoModule,
  ],*/
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
