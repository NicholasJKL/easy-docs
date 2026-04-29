import express from 'express';
import { setupSwagger } from './swagger';
import router from './routes';
import e from 'express';

var PORT = 3000;

const app = express();

app.use(express.json());

app.use(router);

setupSwagger(app);

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT} - http://localhost:3000/api-docs`);
});