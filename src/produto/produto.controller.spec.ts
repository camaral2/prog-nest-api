import { Test } from '@nestjs/testing';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { IProduto } from './interfaces/produto.interfaces';
import { Produto, ProdutoSchema } from './schemas/produto.schema';
import { Res } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

const produtoMock = {
  description: 'Display',
  price: 8.9,
};

describe('ProdutoController', () => {
  let controller: ProdutoController;
  let service: ProdutoService;
  //let res: Partial<Response>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProdutoController],
      providers: [
        ProdutoService,
        {
          provide: getModelToken('Produto'),
          useValue: {
            new: jest.fn().mockResolvedValue(produtoMock),
            constructor: jest.fn().mockResolvedValue(produtoMock),
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    //res = jest.fn(() => {
    //  status: jest.fn().mockReturnThis();
    //});

    service = moduleRef.get<ProdutoService>(ProdutoService);
    controller = moduleRef.get<ProdutoController>(ProdutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of produtos', async () => {
    const prods: Produto[] = [];
    const p1: Produto = { description: 'Mouse', price: 2.98 };
    const p2: Produto = { description: 'Paper', price: 4.2 };
    prods.push(p1);
    prods.push(p2);

    //const mockResponse = {
    //  json: jest.fn().mockResolvedValue(prods),
    //  status: jest.fn().mockReturnThis(),
    //};

    //jest
    //  .spyOn(service, 'getProdutos')
    //  .mockResolvedValue(() => Promise.resolve(prods as IProduto[]));

    jest.spyOn(service, 'getProdutos').mockResolvedValue(prods as IProduto[]);

    const findAllResult = await controller.getProdutos();
    expect(findAllResult).toBe(prods);
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
