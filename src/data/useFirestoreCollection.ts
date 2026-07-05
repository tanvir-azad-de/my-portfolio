"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, FirestoreError, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useSections } from "@/providers/SectionProvider";

export function useFirestoreCollection(id?: string, hasLocalContent?: boolean) {
  const { activeSection } = useSections();
  const [data, setData] = useState<FirestoreDocType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        if (id) {
          if(hasLocalContent) return 
          const ref = doc(db, activeSection.toLowerCase(), id);
          const snap = await getDoc(ref);
          if (!isMounted) return;

          if (snap.exists()) {
            const item = { id: snap.id, ...(snap.data() as Omit<FirestoreDocType, "id">) };
            setData([item]);
          } else {
            setData([]);
          }
        } else {
          const ref = collection(db, activeSection.toLowerCase());
          const snap = await getDocs(ref);
          if (!isMounted) return;

          const items = snap.docs.map(
            (d) => ({ id: d.id, ...(d.data() as Omit<FirestoreDocType, "id">) })
          );

          const sortedItems = items.sort((a, b) => {
            if (a?.seq && b?.seq) {
              return a.seq - b.seq; 
            }
            return 0;
          });

          setData(sortedItems);
          console.log(sortedItems)
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError(err as FirestoreError);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [id, activeSection]);

  return { data, loading, error };
}
