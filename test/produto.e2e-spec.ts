import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@exmpl/app.module';
import { faker } from '@faker-js/faker';

faker.setLocale('en');

describe('Produto Controller (e2e)', () => {
  let app: INestApplication;
  const priceFaker = Number(faker.commerce.price(100, 9000)) / 100;

  const prod = {
    description: faker.commerce.productName(),
    price: priceFaker,
  };

  //save a new produto
  let newProd;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // <----- here
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Insert a produto', () => {
    it('/POST produto', async () => {
      const resp = await request(app.getHttpServer())
        .post('/produto')
        .send(prod)
        .expect(201);

      newProd = resp.body;

      expect(newProd).toMatchObject(prod);
    });

    it('/POST a produto duplicate', async () => {
      await request(app.getHttpServer())
        .post('/produto')
        .send(prod)
        .expect(400)
        .expect(/Produto already exists!/);
    });

    it('/POST a produto without attribute description', async () => {
      await request(app.getHttpServer())
        .post('/produto')
        .send({ description: '', price: 89.79 })
        .expect(400)
        .expect(/description should not be empty/);
    });

    it('/POST a produto without attribute price', async () => {
      await request(app.getHttpServer())
        .post('/produto')
        .send({ description: faker.commerce.productName(), price: 0 })
        .expect(400)
        .expect(/price should not be equal to 0/);
    });
  });

  it(`/GET produtos`, async () => {
    const resp = await request(app.getHttpServer()).get('/produto').expect(200);

    expect(resp.body).toBeDefined();
    expect(Array.isArray(resp.body)).toBeTruthy();

    const rta = resp.body.filter(
      (it) => it.description === newProd.description,
    );

    expect(rta[0]).toMatchObject(newProd);
  });

  describe('Find produto', () => {
    it('/GET a produto', async () => {
      const resp = await request(app.getHttpServer())
        .get('/produto/' + newProd.description)
        .expect(200);

      expect(resp.body).toMatchObject(newProd);
    });

    it('/Get a produto not exists', async () => {
      await request(app.getHttpServer())
        .get('/produto/fassdafsd')
        .expect(404)
        .expect(/Produto not found!/);
    });
  });

  describe('Delete produto', () => {
    it('/DELETE a produto', async () => {
      const resp = await request(app.getHttpServer())
        .delete('/produto/' + newProd.description)
        .expect(200);

      expect(resp.body).toMatchObject(newProd);
    });

    it('/DELETE a produto not exists', async () => {
      await request(app.getHttpServer())
        .delete('/produto/fassdafsd')
        .expect(404)
        .expect(/Produto not found!/);
    });
  });
});
