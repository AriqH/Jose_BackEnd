import request from 'supertest';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import router from '../routes';

app = express();

app.use(cors({
    credentials: true,  origin: ['http://localhost:5173', 'http://localhost:5001'],
}));
app.use(cookieParser())

app.use(bodyParser.json());
app.use(express.json())

app.use(router);
describe('User Controller', () => {

    describe('Register', () => {
        it('should register a new user', async () => {
            const newUser = {
                name: 'New Test User',
                email: 'logintest@example.com',
                password: 'newtestpassword',
                confPassword: 'newtestpassword',
            };

            const response = await request(app)
                .post('/users')
                .send(newUser)
                .expect(200);

            expect(response.body).toHaveProperty('msg', 'Register Berhasil');
            expect(response.body).toHaveProperty('user');
        });

        it('should return an error for mismatched passwords', async () => {
            const newUser = {
                name: 'Mismatched Password User',
                email: 'mismatchedpassword@example.com',
                password: 'password1',
                confPassword: 'password2',
            };

            const response = await request(app)
                .post('/users')
                .send(newUser)
                .expect(400);

            expect(response.body).toHaveProperty('msg', 'Password tidak cocok');
        });
    });
})
