import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/database";
import { createItem } from "./factories/itemFactories";

const agent = supertest(app);

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "items" RESTART IDENTITY`;
})


describe('Testa POST /items ', () => {
  it('Deve retornar 201, se cadastrado um item no formato correto', async () => {
    const item = await createItem();
    const response = await agent.post("/items").send(item);

    expect(response.status).toEqual(201);
  });

  it('Deve retornar 409, ao tentar cadastrar um item que exista', async () => {
    const item = await createItem();
    await agent.post("/items").send(item);
    const response = await agent.post("/items").send(item);

    expect(response.status).toEqual(409);
  });
});

describe('Testa GET /items ', () => {
  it('Deve retornar status 200 e o body no formato de Array', async () => {
    const response = await agent.get("/items").send();

    expect(response.status).toEqual(200)
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('Testa GET /items/:id ', () => {
  it('Deve retornar status 200 e um objeto igual a o item cadastrado', async () => {
    const response = await agent.get("/items/1").send();

    expect(response.status).toEqual(200);
  });
  it('Deve retornar status 404 caso não exista um item com esse id', async () => {
    const response = await agent.get("/items/-1").send();

    expect(response.status).toEqual(404);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
})
