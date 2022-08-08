import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

export const addDocument = (collect, data) => {
  addDoc(collection(db, collect), {
    ...data,
    createdAt: serverTimestamp()
  });
};