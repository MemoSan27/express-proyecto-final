const request = require('supertest');
const app = require('../app');
require('../models')

let token;
let id;

beforeAll(async() => {
    const credentials = {
        email: 'test@gmail.com',
        password: 'test1234',
    }
    const res = await request(app).post('/users/login').send(credentials)
    token = res.body.token;
})

//*GET PRODUCTCARTS
test('GET / productcarts ', async() => {
    const res = await request(app)
                        .get('/productcarts')
                        .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);                    
});

//*CREATE PRODUCTCART
test('POST / productcart', async() => {
    
    const newCartProduct = {
        quantity: 3
    }

    const res = await request(app)
                    .post('/productcarts')
                    .set('Authorization', `Bearer ${token}`)
                    .send(newCartProduct)
                    
    id = res.body.id;
   
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.quantity).toBe(newCartProduct.quantity);
});

//*MODIFY PRODUCTCART
test("PUT / productcart", async() => {
    const productCart = {
        quantity: 2
    }

    const res = await request(app)
    .put(`/productcarts/${id}`)
    .send(productCart)
    .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(productCart.quantity);
})

//*DELETE PRODUCTCART
test('DELETE / productcart', async() => {
    const res = await request(app)
    .delete(`/productcarts/${id}`)
    .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
})