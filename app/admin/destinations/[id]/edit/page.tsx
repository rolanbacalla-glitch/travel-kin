"use client";

import React, { useEffect, useState, use } from "react";
import DestinationForm from "@/components/admin/DestinationForm";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2 } from "lucide-react";

export default function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const docRef = doc(db, "destinations", resolvedParams.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setInitialData({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching destination:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-sunset" />
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="p-12 text-center text-slate-500 font-medium">
        Destination not found.
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto">
      <DestinationForm isEdit={true} initialData={initialData} />
    </div>
  );
}
