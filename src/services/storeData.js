import { Firestore } from "@google-cloud/firestore";

const firestore = new Firestore({
  projectId: 'dulcet-voyager-422410-c2',
  // Add any additional configurations or settings here
  databaseId: 'mlgc-db'
});

export const storeData = async (id, data) => {
  try {
    const predictionsCollection = firestore.collection('predictions');
    const docRef = predictionsCollection.doc(id);
    
    // Check if the document exists (optional)
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
      // If the document doesn't exist, create it
      await docRef.set(data);
      console.log('Data stored in document:', id);
    } else {
      console.log('Document already exists:', id);
    }
  } catch (error) {
    console.error("Failed to store data:", error);
    throw new Error('Failed to store data in Firestore');
  }
}