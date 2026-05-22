import { NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { destinations } from "@/lib/data";

export async function GET() {
  try {
    let count = 0;
    for (const dest of destinations) {
      // Use the 'id' field from lib/data.ts as the document ID
      const docRef = doc(db, "destinations", dest.id);
      
      // We don't need to save the 'icon' function or 'id' in the document fields
      const { id, icon, ...destData } = dest;
      
      await setDoc(docRef, {
        id, // keep id for reference
        ...destData,
        // Default empty arrays/objects if they are missing
        highlights: (dest as any).highlights || [],
        gallery: (dest as any).gallery || [],
        survivalGuide: (dest as any).survivalGuide || {
          bestTime: "",
          connectivity: "",
          transport: "",
          cash: ""
        }
      });
      count++;
    }
    
    return NextResponse.json({ success: true, seededCount: count });
  } catch (error) {
    console.error("Error seeding DB:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
