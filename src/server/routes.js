import { postPredictHandler } from './handlers.js';

const routes = [
    {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
        payload: {
            maxBytes: 1000000,
            allow: 'multipart/form-data',
            multipart: true
        }
    }
    },
    {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return h.response({ status: 'success', message: 'Server is running' }).code(200);
    }
    }
];

export default routes;