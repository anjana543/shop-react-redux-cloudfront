import swaggerJsdoc, { Options } from 'swagger-jsdoc';

const options: Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Product Service API',
            version: '1.0.0',
            description: 'API documentation for Product Service',
        },
    },
    apis: ['./src/**/*.tsx', './src/**/*.ts'],
};

const specs = swaggerJsdoc(options);

export default specs;
