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

describe('Admin Controller', () => {

    describe('adminRegister', () => {
        it('should register a new admin', async () => {
            const newAdmin = {
                name: 'New Test Admin',
                email: 'admintest3@example.com',
                password: 'newtestpassword',
                confPassword: 'newtestpassword',
            };

            const response = await request(app)
                .post('/adminRegister')
                .send(newAdmin)
                .expect(200);

            expect(response.body).toHaveProperty('msg', 'Admin registered successfully');
            expect(response.body).toHaveProperty('admin');
        });

        it('should return an error for mismatched passwords', async () => {
            const newAdmin = {
                name: 'Mismatched Password User',
                email: 'mismatchedpassword@example.com',
                password: 'password1',
                confPassword: 'password2',
            };

            const response = await request(app)
                .post('/adminRegister')
                .send(newAdmin)
                .expect(400);

            expect(response.body).toHaveProperty('msg', 'Password tidak cocok');
        });
    });

    // Similar tests can be written for Login and Logout functions
    // Remember to handle authentication in your tests, like obtaining an access token
});
