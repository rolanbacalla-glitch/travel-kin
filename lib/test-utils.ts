import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const injectDummyUser = async () => {
  try {
    await setDoc(doc(db, "users", "dummy-user-123"), {
      displayName: "Jane Doe (Dummy)",
      email: "jane.doe@example.com",
      role: "user",
      status: "active",
      isVerified: false
    });
    console.log("Dummy user injected!");
  } catch (err) {
    console.error("Error injecting dummy user:", err);
  }
};
