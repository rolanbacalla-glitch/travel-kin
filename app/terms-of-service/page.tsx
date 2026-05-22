"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FileText, Scale, ShieldAlert, Award, Compass, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { MobileMenu } from "@/components/MobileMenu";
import { Footer } from "@/components/Footer";

export default function TermsOfServicePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Destinations", "Crew", "Guides", "Safety"];

  return (
    <main className="relative min-h-screen bg-sand font-sans selection:bg-sunset selection:text-white overflow-x-hidden">
      <Navbar
        isScrolled={isScrolled}
        navLinks={navLinks}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />

      {/* Hero Section */}
      <section className="relative h-[45vh] flex flex-col justify-center items-center overflow-hidden bg-slate">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/guides-hero.png"
            alt="Terms of Service"
            fill
            className="object-cover"
            priority
          />
          {/* Consistent background implementation for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate/80 via-slate/40 to-slate/90 z-10" />
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center mt-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4">
            <Scale className="w-4 h-4 text-sunset" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Legal Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-md">
            Terms of Service
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto font-medium">
            The rules and legal agreements governing your use of our travel platform.
          </p>
        </div>
      </section>

      {/* Document Information Bar */}
      <div className="bg-slate-mid text-white/60 py-4 px-6 border-b border-white/5 text-center text-xs">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6">
          <span><strong>Last Updated:</strong> May 22, 2026</span>
          <span><strong>Governing Law:</strong> England & Wales (UK)</span>
          <span><strong>Scope:</strong> Personal & Companion Travel Vetting</span>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16 px-6 bg-sand">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate/5">
          <div className="space-y-10 text-slate-mid leading-relaxed text-sm md:text-base">
            
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate mb-4 flex items-center gap-3">
                <Compass className="w-6 h-6 text-sunset flex-shrink-0" />
                1. Agreement to Terms
              </h2>
              <p className="mb-4">
                These Terms of Service constitute a legally binding agreement made between you and <strong>Travel Kin Ltd</strong>, registered in England and Wales (Company No. 14782390, registered office: London, WC1N 3AX).
              </p>
              <p>
                By accessing or using our website and mobile application (collectively, the &ldquo;Platform&rdquo;), you acknowledge that you have read, understood, and agreed to be bound by these Terms. If you do not agree to all of these Terms, you are prohibited from using the Platform and must cease usage immediately.
              </p>
            </div>

            {/* UK Consumer Rights Act */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate mb-4 flex items-center gap-3">
                <Award className="w-6 h-6 text-sunset flex-shrink-0" />
                2. UK Consumer Rights Act 2015 Compliance
              </h2>
              <p className="mb-4">
                As a consumer using a digital platform based in the United Kingdom, these Terms do not exclude or limit your statutory rights under the <strong>Consumer Rights Act 2015</strong>.
              </p>
              <p className="mb-4">
                Under the Act, any digital services we provide (such as trip matchmaking, member vetting, and premium guides) must be:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provided with reasonable care and skill.</li>
                <li>As described on our Platform.</li>
                <li>Fit for any specific purpose made known to us.</li>
              </ul>
            </div>

            {/* Package Travel Regulations */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate mb-4 flex items-center gap-3">
                <Users className="w-6 h-6 text-sunset flex-shrink-0" />
                3. The Package Travel Regulations 2018
              </h2>
              <p className="mb-4">
                Please note that Travel Kin is primarily a <strong>social matchmaking and community platform</strong> that allows independent solo travellers to connect and coordinate joint trips.
              </p>
              <div className="p-4 bg-mist rounded-2xl border border-ocean/10 text-xs mb-4">
                <p className="font-semibold text-ocean mb-1">UK Case & Statutory Detail — Package Travel vs Matchmaking:</p>
                Under the **Package Travel and Linked Travel Arrangements Regulations 2018**, a package holiday is created when two or more different types of travel services are booked together for the same trip from a single organiser. Unless explicitly stated during premium booking checkouts:
                <ul className="list-decimal pl-4 mt-2 space-y-1">
                  <li>Travel Kin is not a Package Tour Operator or Travel Agent.</li>
                  <li>Members arrange and pay for their own flights, accommodation, and transport directly with providers.</li>
                  <li>Travel Kin does not hold funds for, nor accept liability for, third-party accommodation or transport bookings.</li>
                </ul>
              </div>
              <p>
                When you choose to join a group Crew or hire a local partner guide on the Platform, you acknowledge that you are entering into a direct social agreement with those members/guides, and not booking a package holiday through Travel Kin Ltd.
              </p>
            </div>

            {/* Vetting & Code of Conduct */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate mb-4 flex items-center gap-3">
                <ShieldAlert className="w-6 h-6 text-sunset flex-shrink-0" />
                4. User Registration, Verification, & Conduct
              </h2>
              <p className="mb-4">
                To maintain community safety, all members must undergo our ID and security vetting process. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Provide accurate, current, and complete registration and ID information.</li>
                <li>Maintain the security of your password and credentials.</li>
                <li>Respect all community safety guidelines. We have a zero-tolerance policy for harassment, discrimination, or reckless behavior.</li>
              </ul>
              <p>
                We reserve the right, under UK civil law and platform safety principles, to suspend or terminate your account immediately if you breach our safety standards, fail verification, or put other travellers at risk.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate mb-4 flex items-center gap-3">
                <Scale className="w-6 h-6 text-sunset flex-shrink-0" />
                5. Limitation of Liability
              </h2>
              <p className="mb-4">
                Nothing in these Terms shall limit or exclude our liability for:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Death or personal injury caused by our negligence, or the negligence of our employees or agents.</li>
                <li>Fraud or fraudulent misrepresentation.</li>
                <li>Any other liability which cannot be excluded or limited under English law.</li>
              </ul>
              <p>
                Subject to the above, Travel Kin Ltd shall not be liable for any indirect or consequential losses, including lost travel bookings, flight cancellation costs, or disputes/injuries arising from meetings and interactions between verified users or local guides on our Platform.
              </p>
            </div>

            {/* Jurisdiction */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-sunset flex-shrink-0" />
                6. Governing Law & Dispute Resolution
              </h2>
              <p className="mb-4">
                These Terms of Service, their subject matter, and their formation are governed by the **laws of England and Wales**.
              </p>
              <p>
                You and Travel Kin Ltd agree that the courts of England and Wales will have exclusive jurisdiction to settle any disputes or claims arising out of or in connection with these Terms, except that if you are a resident of Northern Ireland or Scotland, you may also bring proceedings in your respective local courts.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
