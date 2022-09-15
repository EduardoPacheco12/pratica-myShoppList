import { faker } from "@faker-js/faker";

export async function createItem() {
    const item = {
        title: faker.commerce.product(),
        url: faker.internet.url(),
        description: faker.lorem.paragraph(),
        amount: faker.datatype.number(),
    }
    console.log(item);
    return item;
}

export async function getItem() {

}