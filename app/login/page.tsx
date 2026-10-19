"use client";

import React, { useState, useEffect } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "firebase/auth";
import { auth, logFirebaseEvent } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { useProfileStore } from "@/lib/stores/useProfile";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

function GoogleLogoSvg() {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ display: "block" }}
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
      <path fill="none" d="M0 0h48v48H0z" />
    </svg>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (isSignUp) {
      logFirebaseEvent("sign_up_start", { method: "email" });
    } else {
      logFirebaseEvent("login_start", { method: "email" });
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        logFirebaseEvent("sign_up_success", { method: "email" });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        logFirebaseEvent("login_success", { method: "email" });
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
      if (isSignUp) {
        logFirebaseEvent("sign_up_failure", { method: "email", error: err.message });
      } else {
        logFirebaseEvent("login_failure", { method: "email", error: err.message });
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    logFirebaseEvent("google_login_click");

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const providerPhoto = result.user.providerData?.find((p) => p?.photoURL)?.photoURL;
        const providerName = result.user.providerData?.find((p) => p?.displayName)?.displayName;
        useProfileStore.getState().updateProfile({
          name: result.user.displayName || providerName || result.user.email?.split("@")[0] || "Traveler",
          avatar: result.user.photoURL || providerPhoto || `https://api.dicebear.com/7.x/notionists/png?seed=${result.user.uid}`,
          username: result.user.email?.split("@")[0] || "wanderer",
        });
      }
      logFirebaseEvent("google_login_success");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
      logFirebaseEvent("google_login_failure", { error: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-sunset/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-ocean/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass p-8 md:p-12 rounded-[3rem] relative z-10 shadow-2xl border border-white/40"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-3xl bg-sunset shadow-xl shadow-sunset/20 mb-6">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate mb-2">
            {isSignUp ? "Join the Tribe" : "Welcome Back"}
          </h1>
          <p className="text-slate/60 font-medium">
            {isSignUp ? "Start your solo journey today" : "Sign in to your Travel Kin account"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate/50 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate/40" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mia@example.com"
                className="w-full p-5 pl-14 bg-white/60 backdrop-blur-sm border border-white/40 rounded-[1.5rem] focus:bg-white transition-all outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate/50 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate/40" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-5 pl-14 bg-white/60 backdrop-blur-sm border border-white/40 rounded-[1.5rem] focus:bg-white transition-all outline-none"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-medium px-1">{error}</p>}

          <button 
            type="submit"
            className="w-full py-5 bg-sunset text-white font-bold rounded-full shadow-lg shadow-sunset/20 hover:bg-sunset-dark transition-all active:scale-95 flex items-center justify-center gap-2 group"
          >
            {isSignUp ? "Create Account" : "Sign In"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest text-slate/30">
            <span className="bg-transparent px-4">Or continue with</span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="gsi-material-button"
          >
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <GoogleLogoSvg />
              </div>
              <span className="gsi-material-button-contents">
                {isSignUp ? "Sign up with Google" : "Sign in with Google"}
              </span>
              <span style={{ display: "none" }}>
                {isSignUp ? "Sign up with Google" : "Sign in with Google"}
              </span>
            </div>
          </button>
        </div>

        <p className="mt-10 text-center text-sm font-medium text-slate/50">
          {isSignUp ? "Already have an account?" : "New to Travel Kin?"}{" "}
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sunset font-bold hover:underline ml-1"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </motion.div>

      <div className="mt-8 relative z-10">
        <Link href="/" className="text-sm font-bold text-slate/40 hover:text-slate transition-colors">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
