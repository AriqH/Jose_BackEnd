import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/index.js';
import db from "./config/Database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

export const app = express();
dotenv.config();

app.use(cors());
app.use(cookieParser())

app.use(bodyParser.json());
app.use(express.json())

app.use(router);

const port = 5001;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// module.exports ={app}
// export default app;
