import express from 'express';
import { setupSwagger } from './swagger';
import router from './routes';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/api', router);

setupSwagger(app);

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port} - http://localhost:${port}/api-docs`);
});