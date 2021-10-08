const request = require('supertest');
const server = require('../../src/server')
const jwt = require('jsonwebtoken');
const { SecretKey } = require('../../src/config/secretKey');


describe('Admin Authentication', () => {

    it('should authenticate with valid credentials', async () => {
        const response = await request(server).post('/authorization').send(
            {
                application: 'admin',
                password: 'Wolters_321!'
            })

        expect(response.status).toBe(202);
    });

    it('should not authenticate with invalid credentials', async () => {
        const response = await request(server).post('/authorization').send(
            {
                application: 'admin',
                password: '121!'
            })

        expect(response.status).toBe(401);
        expect(response.body).not.toHaveProperty('token');
    });

    it('should return JWT token when authenticate', async () => {
        const response = await request(server).post('/authorization').send(
            {
                application: 'admin',
                password: 'Wolters_321!'
            })

        expect(response.status).toBe(202);
        expect(response.body).toHaveProperty('token');
        const token = response.body.token;
        expect(
            jwt.verify(token, SecretKey, (err, decoded) => {
                if (err)
                    return false;
                else
                    return true;
            })).toBe(true);
    });

    it('should not be able to access private routes without jwt token', async () => {
        var getRoutes = ['/systems', '/features', '/ratings', '/reporting', '/system/1', '/feature/1', '/rating/1', '/rating/feature/1', '/rating/user/1'];
        var postRoutes = ['/system', '/feature', '/rating'];
        var deleteRoutes = ['/system/1', '/feature/1', '/rating/1'];

        for (rota of getRoutes) {
            const systemResponse = await request(server).get(rota);

            expect(systemResponse.status).toBe(401);
            expect(systemResponse.body).not.toBeNull();
            expect(systemResponse.body.statusCode).toBe(4);
        }

        for (rota of postRoutes) {
            const systemResponse = await request(server).post(rota);

            expect(systemResponse.status).toBe(401);
            expect(systemResponse.body).not.toBeNull();
            expect(systemResponse.body.statusCode).toBe(4);
        }

        for (rota of deleteRoutes) {
            const systemResponse = await request(server).delete(rota);

            expect(systemResponse.status).toBe(401);
            expect(systemResponse.body).not.toBeNull();
            expect(systemResponse.body.statusCode).toBe(4);
        }


    });

    it('should not be able to access private routes with invalid jwt token', async () => {
        var getRoutes = ['/systems', '/features', '/ratings', '/reporting', '/system/1', '/feature/1', '/rating/1', '/rating/feature/1', '/rating/user/1'];
        var postRoutes = ['/system', '/feature', '/rating'];
        var deleteRoutes = ['/system/1', '/feature/1', '/rating/1'];

        for (rota of getRoutes) {
            const systemResponse = await request(server).get(rota).set("Authorization", `Bearer 2382931237`);

            expect(systemResponse.status).toBe(401);
            expect(systemResponse.body).not.toBeNull();
            expect(systemResponse.body.statusCode).toBe(4);
        }

        for (rota of postRoutes) {
            const systemResponse = await request(server).post(rota).set("Authorization", `Bearer 2382931237`);;

            expect(systemResponse.status).toBe(401);
            expect(systemResponse.body).not.toBeNull();
            expect(systemResponse.body.statusCode).toBe(4);
        }

        for (rota of deleteRoutes) {
            const systemResponse = await request(server).delete(rota).set("Authorization", `Bearer 2382931237`);;

            expect(systemResponse.status).toBe(401);
            expect(systemResponse.body).not.toBeNull();
            expect(systemResponse.body.statusCode).toBe(4);
        }

    });

    it('should not be able to access private routes with invalid jwt token', async () => {

        //arranjar
        //agir
        //afirmar

        var getRoutes = ['/systems', '/features', '/ratings', '/reporting', '/system/1', '/feature/1', '/rating/1', '/rating/feature/1', '/rating/user/1'];
        var postRoutes = ['/system', '/feature', '/rating'];
        var deleteRoutes = ['/system/1', '/feature/1', '/rating/1'];

        for (rota of getRoutes) {
            const systemResponse = await request(server).get(rota).set("Authorization", `Bearer 2382931237`);

            expect(systemResponse.status).toBe(401);
            expect(systemResponse.body).not.toBeNull();
            expect(systemResponse.body.statusCode).toBe(4);
        }

        for (rota of postRoutes) {
            const systemResponse = await request(server).post(rota).set("Authorization", `Bearer 2382931237`);;

            expect(systemResponse.status).toBe(401);
            expect(systemResponse.body).not.toBeNull();
            expect(systemResponse.body.statusCode).toBe(4);
        }

        for (rota of deleteRoutes) {
            const systemResponse = await request(server).delete(rota).set("Authorization", `Bearer 2382931237`);;

            expect(systemResponse.status).toBe(401);
            expect(systemResponse.body).not.toBeNull();
            expect(systemResponse.body.statusCode).toBe(4);
        }

    });

});

// "pretest": "npx knex migrate:latest",
// "posttest": "npx knex migrate:rollback",


//a rota autenticação deve receber um 