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

describe('Chat Controller', () => {
    describe('chat', () => {
        it('should return prompt from chatgpt', async () =>{
            const newChat={
                prompt: "Kucing meninggal"
            };
            const response = await request(app)
                .post('/chat')
                .send(newChat)
                .expect(200);
            expect(response.body).toHaveProperty('role');
            expect(response.body).toHaveProperty('content');
        }, 60000)
    })
})
