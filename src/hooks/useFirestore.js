import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFirestore = (collect) => {
    const [documents, setDocuments] = useState([])

    useEffect(() => {
        let collectionRef = query(collection(db, collect), orderBy('createdAt'));

        const unsubscribe = onSnapshot((collectionRef), (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                })
            )
            setDocuments(data)
        })

        return unsubscribe;
      }, [collect])

      return documents
}

export default useFirestore