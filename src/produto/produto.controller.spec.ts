import { Test } from '@nestjs/testing';
import { ProdutoController } from './produto.controller';
//import { ProdutoModule } from './produto.module';
import { ProdutoService } from './produto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProdutoSchema } from './schemas/produto.schema';
import { Res } from '@nestjs/common';

describe('ProdutoController', () => {
  let controller: ProdutoController;
  let service: ProdutoService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProdutoController],
      providers: [
        {
          provide: ProdutoService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<ProdutoService>(ProdutoService);
    controller = moduleRef.get<ProdutoController>(ProdutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /*
  it('Should get all produtos', () => {
    controller.getProdutos(Res).then((data) => {
      expect(data.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('Should get produto 1', () => {
    expect(produtoController.getProduto({ id: 1 })).toMatchObject({
      description: 'Mouse',
      id: 1,
    });
  });
  it('Should add new produto', async () => {
    const newProd = {
      description: 'key',
      price: 4.59,
      width: 340,
      message: 'test',
    };
    const ret = await produtoController.addProduto('produto', newProd);
    expect(ret).toMatchObject(newProd);
  });
*/
});
