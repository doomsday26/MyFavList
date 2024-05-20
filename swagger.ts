const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/userListItem.route.ts']

swaggerAutogen(outputFile, endpointsFiles)