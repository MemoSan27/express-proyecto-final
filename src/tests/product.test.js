const request = require('supertest');
const app = require('../app');
require('../models')

let token;

beforeAll(async() => {

    const credentials = {
        email: "test@gmail.com",
        password: "test1234",
    }

    const res = await request(app)
                        .post('/users/login')
                        .send(credentials);
    
    token = res.body.token;                    
})

//*GET ALL PRODUCTS
test('GET / products', async() => { 
    const res = await request(app)
    .get('/products')

    console.log(res.body)
    
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

//*CREATE CATEGORY
test('POST / product', async() => {
    
    const newProduct = {
        title: "Televisor 40",
        description: "lasdasdasdasdasdasd",
        brand: "ssdasdasdasdasds",
        price: 1033.22
    }

    const res = await request(app)
                    .post('/products')
                    .set('Authorization', `Bearer ${token}`)
                    .send(newProduct)
                    
    id = res.body.id;
   
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe(newProduct.title);
});

//*MODIFY PRODUCT
test("PUT / product", async() => {
    const product = {
        title: "tele actualizado"
    }

    const res = await request(app)
    .put(`/products/${id}`)
    .send(product)
    .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200);
    expect(res.body.title).toBe(product.title);
})

//*DELETE PRODUCT
test('DELETE / product', async() => {
    const res = await request(app)
    .delete(`/products/${id}`)
    .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
})