import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TemplateServiceHandler',
            version: 'dev',
            description: '',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Сервер разработки',
            },
        ],
    },
    apis: ['./src/routes.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};