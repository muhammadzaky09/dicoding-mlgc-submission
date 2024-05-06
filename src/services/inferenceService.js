import tf from '@tensorflow/tfjs-node';
import ClientError from '../exceptions/clientError.js';

const predictClassification = async (model, image) => {
    try {
        const tensor = tf.node
        .decodeJpeg(image)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat();

        // Predict the image
        const prediction = model.predict(tensor);
        const score = (await prediction.data()); // This gets the raw output scores from the model
        const label = score > 0.5 ? 'Cancer' : 'Non-cancer'; // Threshold at 0.5

        let suggestion = label === 'Cancer' ? 'Segera periksa ke dokter!' : 'Tidak ada tanda-tanda kanker. Tetap jaga kesehatan!';
        return { label, suggestion };
        
    } catch (error) {
        throw new ClientError(400, 'Terjadi kesalahan dalam melakukan prediksi');
    }
    

    
}

export default predictClassification;