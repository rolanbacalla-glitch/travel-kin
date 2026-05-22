"use client";

import React, { useState } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "firebase/auth";
import { auth, logFirebaseEvent } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.535 0-6.403-2.885-6.403-6.4s2.868-6.4 6.403-6.4c1.582 0 3.02.574 4.135 1.517l3.04-3.04C19.333 2.502 16.033 1 12.24 1 5.766 1 .5 6.27.5 12.75S5.766 24.5 12.24 24.5c6.545 0 11.24-4.596 11.24-11.24 0-.768-.082-1.337-.22-1.975H12.24z" />
    </svg>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
    const provider = new GoogleAuthProvider();
    logFirebaseEvent("google_login_click");
    try {
      await signInWithPopup(auth, provider);
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

        <button 
          onClick={handleGoogleSignIn}
          className="w-full py-5 bg-white/60 backdrop-blur-sm border border-white/40 text-slate font-bold rounded-full hover:bg-white transition-all active:scale-95 flex items-center justify-center gap-3 shadow-sm"
        >
          <GoogleIcon className="w-5 h-5 text-ocean" />
          Google
        </button>

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
