import Hapi from '@hapi/hapi';
import routes from './routes.js';
import loadModel from '../services/loadModel.js';
import ClientError from '../exceptions/clientError.js';
import 'dotenv/config';

(async () => {
    const server = Hapi.server({
        port: 3000,
        host: process.env.NODE_ENV === 'development' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    });

    const model = await loadModel();
    server.app.model = model;

    server.route(routes);

    server.ext('onPreResponse', (request, h) => {
        const response = request.response;
        if (response.isBoom) {
            if (response.data && response.data instanceof ClientError) {
                return h.response({
                    status: response.data.status,
                    message: response.data.message
                }).code(response.data.statusCode);
            }
            // Handle other generic Boom errors
            return h.response({
                status: 'fail',
                message: response.output.payload.message || 'An error occurred'
            }).code(response.output.statusCode);
        }
        return h.continue;
    });

   
    await server.start().then(() => {
        console.log(`Server running on ${server.info.uri}`);
    });

})();