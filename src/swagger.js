const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const routerPath = path.join(__dirname, './routes/**/*.js');

const swagger = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Banking application',
      version: '1.0.0',
    },
  },
  apis: [routerPath],
});

module.exports = swagger;
