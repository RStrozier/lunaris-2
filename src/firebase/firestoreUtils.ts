// firebase/firestoreUtils.ts
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Define a generic type for Firestore documents
interface FirestoreDocument {
  id?: string; // Optional because it will be assigned by Firestore
  [key: string]: any; // Flexible to handle different data structures
}

// Add data to a Firestore collection
export const addData = async (collectionName: string, data: FirestoreDocument) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Fetch all documents from a Firestore collection
export const fetchData = async (collectionName: string): Promise<FirestoreDocument[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error fetching data: ", e);
    return [];
  }
};

// Update a Firestore document
export const updateData = async (collectionName: string, id: string, newData: FirestoreDocument) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, newData);
    console.log("Document updated with ID: ", id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

// Delete a Firestore document
export const deleteData = async (collectionName: string, id: string) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};