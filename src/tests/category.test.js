const request = require('supertest');
const app = require('../app');


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

//*GET ALL CATEGORIES
test('GET / categories debe traer todos los categories', async() => { 
    const res = await request(app)
    .get('/categories')
    
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

//*CREATE CATEGORY
test('POST / categories debe de crear un category', async() => {
    
    const newCategory = {
        name: "Comedia",
    }

    const res = await request(app)
                    .post('/categories')
                    .set('Authorization', `Bearer ${token}`)
                    .send(newCategory)
                    
    id = res.body.id;
   
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe("Comedia");
});

//*MODIFY USER
test("PUT /categories/:id debe actualizar un category", async() => {
    const category = {
        name: "comedia actualizado"
    }

    const res = await request(app)
    .put(`/categories/${id}`)
    .send(category)
    .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("comedia actualizado");
})

//*DELETE CATEGORY
test('DELETE / categories should delete a category', async() => {
    const res = await request(app)
    .delete(`/categories/${id}`)
    .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
})