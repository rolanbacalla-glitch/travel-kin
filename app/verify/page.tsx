"use client";

import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { 
  Camera, 
  ShieldCheck, 
  ChevronRight, 
  Check, 
  RotateCcw, 
  FileText,
  Lock,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────── */
/* Components                                                    */
/* ─────────────────────────────────────────────────────────── */

export default function VerificationPage() {
  const [step, setStep] = useState<"intro" | "capture" | "review" | "processing" | "success">("intro");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      setStep("review");
    }
  }, [webcamRef]);

  const startProcessing = () => {
    setStep("processing");
    // Simulate OCR/AI verification
    setTimeout(() => {
      setStep("success");
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-slate flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-ocean/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-2xl space-y-8"
            >
              <div className="w-20 h-20 bg-ocean/10 rounded-3xl flex items-center justify-center text-ocean mx-auto">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-serif text-slate font-bold">Trusted Verification</h1>
                <p className="text-slate/60 max-w-xs mx-auto">Join a community of 12,000+ verified solo travellers in Southeast Asia.</p>
              </div>

              <div className="space-y-4">
                <VerificationPoint icon={FileText} title="Valid ID Required" desc="Passport or Government ID" />
                <VerificationPoint icon={Camera} title="Live Capture" desc="A quick photo of your document" />
                <VerificationPoint icon={Lock} title="Encrypted" desc="Your data is 100% private & secure" />
              </div>

              <button 
                onClick={() => setStep("capture")}
                className="w-full py-5 bg-ocean text-white font-bold rounded-2xl shadow-xl shadow-ocean/20 hover:bg-ocean-dark transition-all active:scale-95 flex items-center justify-center gap-3 group"
              >
                Start Verification
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <Link href="/onboarding" className="block text-center text-slate/40 text-sm font-bold uppercase tracking-widest hover:text-slate transition-colors">
                Maybe Later
              </Link>
            </motion.div>
          )}

          {step === "capture" && (
            <motion.div 
              key="capture"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="relative aspect-[3/4] md:aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 group">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover"
                  videoConstraints={{ facingMode: "user" }}
                />
                {/* Overlay for ID placement */}
                <div className="absolute inset-0 border-2 border-white/20 m-12 rounded-xl pointer-events-none flex items-center justify-center">
                  <div className="w-full h-full border border-dashed border-white/40 rounded-lg flex flex-col items-center justify-center gap-3">
                     <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/60 text-xs font-bold uppercase tracking-widest">Position ID within frame</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-6">
                <button 
                   onClick={() => setStep("intro")}
                   className="p-5 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all font-bold group"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={capture}
                  className="w-20 h-20 bg-sunset rounded-full shadow-2xl border-8 border-white/20 ring-4 ring-sunset/30 flex items-center justify-center text-white hover:scale-110 active:scale-90 transition-all"
                >
                  <div className="w-8 h-8 rounded-full border-4 border-white" />
                </button>
                <div className="w-16" /> {/* Spacer */}
              </div>
            </motion.div>
          )}

          {step === "review" && (
            <motion.div 
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-2xl space-y-8"
            >
              <h2 className="text-2xl font-serif text-slate font-bold text-center">Is the text clear?</h2>
              <div className="aspect-[3/4] md:aspect-video rounded-2xl overflow-hidden shadow-inner border border-slate/5 bg-sand relative">
                {capturedImage && (
                  <Image 
                    src={capturedImage} 
                    alt="Captured ID" 
                    fill 
                    unoptimized 
                    className="object-cover" 
                  />
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setStep("capture")}
                  className="py-4 bg-slate/5 text-slate/50 font-bold rounded-xl hover:bg-slate/10 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retake
                </button>
                <button 
                  onClick={startProcessing}
                  className="py-4 bg-ocean text-white font-bold rounded-xl shadow-lg hover:shadow-ocean/20 transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Confirm ID
                </button>
              </div>
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div 
              key="processing"
              className="text-center space-y-10"
            >
              <div className="relative w-32 h-32 mx-auto">
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 border-4 border-white/10 border-t-ocean rounded-full shadow-lg shadow-ocean/20"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="w-12 h-12 text-ocean" />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-serif text-white font-bold">Verifying Identity</h2>
                <div className="w-full max-w-xs mx-auto h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.5 }}
                      className="h-full bg-ocean"
                    />
                </div>
                <p className="text-white/40 font-medium animate-pulse">Running biometric match & OCR...</p>
              </div>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div 
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[2.5rem] p-12 shadow-2xl text-center space-y-8"
            >
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto ring-8 ring-green-500/5">
                <Check className="w-12 h-12 text-green-500" />
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-serif text-slate font-bold">Verified!</h2>
                <p className="text-slate/50">Your identity check was successful. You now have full access to our global travellers network.</p>
              </div>
              <Link 
                href="/dashboard" 
                className="block w-full py-5 bg-slate text-white font-bold rounded-2xl shadow-xl hover:bg-slate-dark transition-all active:scale-95"
              >
                Go to Dashboard
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Security Footer */}
      <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-3 text-white/20 select-none">
        <Lock className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-[0.2em]">End-to-End Encryption Enabled</span>
      </div>
    </div>
  );
}

function VerificationPoint({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4 text-left p-4 hover:bg-slate/5 rounded-2xl transition-all group">
      <div className="p-3 bg-ocean/5 text-ocean rounded-xl group-hover:bg-ocean group-hover:text-white transition-all">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-bold text-slate leading-tight">{title}</h4>
        <p className="text-slate/40 text-sm leading-tight">{desc}</p>
      </div>
    </div>
  );
}
