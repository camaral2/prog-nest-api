//https://github.com/skunight/nestjs-redis/issues/91
//https://github.com/nestjs/nest/blob/master/sample/06-mongoose/src/cats/cats.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from '@exmpl/produto/produto.service';
import { Produto } from '@exmpl/produto/schemas/produto.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProdutoAlreadyExists } from '@exmpl/produto/exception/produto-already-exists';
import { ProdutoNotFound } from '@exmpl/produto/exception/produto-not-found';

const listProdutosMock = [
  {
    description: 'Mouse',
    price: 2.98,
  },
  {
    description: 'Keyboard',
    price: 4.14,
  },
];

const oneProdutoMock = {
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
            new: jest.fn().mockResolvedValue(oneProdutoMock),
            constructor: jest.fn().mockResolvedValue(oneProdutoMock),
            find: jest.fn(),
            findOne: jest.fn(),
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

  describe('Produto New', () => {
    it('should insert a new produto', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(oneProdutoMock));

      const newProd = await service.addProduto(oneProdutoMock);
      expect(newProd).toEqual(oneProdutoMock);
    });

    it('should return then error produto already exists', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(oneProdutoMock),
      } as any);

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(oneProdutoMock));

      await expect(service.addProduto(oneProdutoMock)).rejects.toThrow(
        ProdutoAlreadyExists,
      );
    });
  });

  describe('Produto List', () => {
    it('should return an array of produto', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(listProdutosMock),
      } as any);

      //model.find.mockResolvedValue(produtosMock);
      const res = await service.getProdutos();

      expect(res).toMatchObject(listProdutosMock);
      expect(model.find).toHaveBeenCalledTimes(1);

      expect(res.length).toBe(2);
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('Produto find', () => {
    it('should return a produto', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue(oneProdutoMock as any);

      const res = await service.getProduto(oneProdutoMock.description);

      expect(model.findOne).toHaveBeenCalledTimes(1);
      expect(res).toMatchObject(oneProdutoMock);
    });

    it('should fail if no produto is found', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue(null);

      const res = await expect(
        service.getProduto(oneProdutoMock.description),
      ).rejects.toThrow(ProdutoNotFound);

      expect(model.findOne).toHaveBeenCalledTimes(1);
      expect(model.findOne).toHaveBeenCalledWith({ description: 'Display' });
    });
  });
});
