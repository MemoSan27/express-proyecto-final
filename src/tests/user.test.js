const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
require('../models');

let id;
let token;

test('POST / users debe de crear un user', async() => {
    
    const newUser = {
        firstName: "Rolando",
        lastName: "Arenas",
        email: "rolando2@gmail.com",
        password: "123456",
        phone: "6699669988"
    }

    const res = await request(app)
                    .post('/users')
                    .send(newUser)
    id = res.body.id;
    /* await city.destroy();  */
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe("Rolando");
});

test('GET / users debe traer todos los users', async() => { 
    const res = await request(app)
    .get('/users')
    /* .set('Authorization', `Bearer ${token}`) */

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("PUT /users/:id debe actualizar un user", async() => {
    const user = {
        firstName: "user actualizado"
    }

    const res = await request(app)
    .put(`/users/${id}`)
    .send(user)
/*     .set('Authorization', `Bearer ${token}`) */

    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe("user actualizado");
})

test('DELETE / users should delete a user', async() => {
    const res = await request(app)
    .delete(`/users/${id}`)
/*     .set('Authorization', `Bearer ${token}`); */

    expect(res.status).toBe(204);
})