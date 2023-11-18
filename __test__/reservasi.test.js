import request from 'supertest';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import router from '../routes';
import Reservation from '../models/ReservationModel.js'; // Import the Reservation model

const app = express(); // Ensure that you declare app using 'const'

app.use(cors({
    credentials: true,  origin: ['http://localhost:5173', 'http://localhost:5001'],
}));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(express.json());

app.use(router);

describe('Reservasi Controller', () => {

    describe('getReservasi', () => {
        it('should get all reservations', async () => {
            // Assuming you have some reservations in the database for testing
            // You may want to seed the database with sample data for this test
            const response = await request(app)
                .get('/reservation')
                .expect(200);

            // Assuming the response body is an array of reservations
            expect(Array.isArray(response.body)).toBe(true);

            // Add more specific assertions based on your data model
            // For example, check if each item in the array has certain properties
            if (response.body.length > 0) {
                const reservation = response.body[0];
                expect(reservation).toHaveProperty('name');
                expect(reservation).toHaveProperty('date');
                expect(reservation).toHaveProperty('email');
                // Add more property checks as needed
            }
        });

        it('should handle errors and return 500 status code', async () => {
            // Mocking the Reservation.findAll method to simulate an error
            jest.spyOn(Reservation, 'findAll').mockImplementation(() => {
                throw new Error('Mocked error');
            });

            const response = await request(app)
                .get('/reservation')
                .expect(500);

            expect(response.body).toHaveProperty('message', 'An error occurred while fetching reservations');
        });
    });
});

    describe('createReservation', () => {
        it('should create new reservation', async () =>{
            const newReservation={
                name: "Test User",
                date: "2023-10-29",
                email: "test@example.com",
                jenisHewan: "Cat",
                whatsapp: "123456789",
                tujuan: "Vet Clinic"
            };
            const response = await request(app)
                .post('/reservation')
                .send(newReservation)
                .expect(201);
            // console.log(response);
            expect(response.body).toHaveProperty('message', 'Reservation successful');
            expect(response.body).toHaveProperty('reservation');
        })
    })
