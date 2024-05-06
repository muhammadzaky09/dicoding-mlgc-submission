import predictClassification from "../services/inferenceService.js";
import {storeData} from "../services/storeData.js";
import crypto from 'crypto';


const postPredictHandler = async (request, h) => {
    try{
        const { model } = request.server.app;
        const { image } = request.payload;
    
        if (!image) {
            return h.response({
                status: 'fail',
                message: 'Image file is required.'
            }).code(400);
        }
    
        
        const {  label, suggestion } = await predictClassification(model, image);
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();
        const data = {
            "id":id,
            "result": label,
            "suggestion": suggestion,
            "createdAt": createdAt
        };
        await storeData(id, data);
    
        const response = h.response({
            status: 'success',
            message: 'Model is predicted successfully',
            data
        });
        response.code(201);
        return response;

    } catch (error) {
        return h.response({
            status: 'fail',
            message: error.message
        }).code(error.statusCode);
    }
   
   
};

export { postPredictHandler };