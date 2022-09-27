//https://github.com/skunight/nestjs-redis/issues/91
//https://github.com/nestjs/nest/blob/master/sample/06-mongoose/src/cats/cats.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from './produto.service';
import { Produto } from './schemas/produto.schema';
import { ProdutoModule } from './produto.module';
import { IProduto } from './interfaces/produto.interfaces';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProdutoDTO } from './dto/create-produto.dto';

const produtosMock = [
  {
    description: 'Mouse',
    price: 2.98,
  },
  {
    description: 'Keyboard',
    price: 4.14,
  },
];

const produtoMock = {
  description: 'Display',
  price: 8.9,
};

describe('ProdutoService', () => {
  let service: ProdutoService;
  let model: Model<Produto>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoService,
        {
          provide: getModelToken('Produto'),
          useValue: {
            new: jest.fn().mockResolvedValue(produtoMock),
            constructor: jest.fn().mockResolvedValue(produtoMock),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = app.get<ProdutoService>(ProdutoService);
    model = app.get<Model<Produto>>(getModelToken('Produto'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(model).toBeDefined();
  });

  describe('Produto List', () => {
    it('should return an array of produto', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(produtosMock),
      } as any);

      //model.find.mockResolvedValue(produtosMock);
      const res = await service.getProdutos();

      expect(res).toMatchObject(produtosMock);
      expect(model.find).toHaveBeenCalledTimes(1);

      expect(res.length).toBe(2);
      expect(model.find).toHaveBeenCalled();
    });

    it('should insert a new produto', async () => {
      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(produtoMock));

      const newProd = await service.addProduto(produtoMock);
      expect(newProd).toEqual(produtoMock);
    });
  });
});
