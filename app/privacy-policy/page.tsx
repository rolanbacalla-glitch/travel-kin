"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Shield, Lock, Eye, FileText, Scale, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { MobileMenu } from "@/components/MobileMenu";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicyPage() {
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
            src="/images/safety-hero.png"
            alt="Privacy Commitment"
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
            <Shield className="w-4 h-4 text-sunset" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Legal Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-md">
            Privacy Policy
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto font-medium">
            How we protect and process your data under UK GDPR and Data Protection laws.
          </p>
        </div>
      </section>

      {/* Document Information Bar */}
      <div className="bg-slate-mid text-white/60 py-4 px-6 border-b border-white/5 text-center text-xs">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6">
          <span><strong>Effective Date:</strong> May 22, 2026</span>
          <span><strong>Jurisdiction:</strong> United Kingdom (UK GDPR)</span>
          <span><strong>Version:</strong> 2.1</span>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16 px-6 bg-sand">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate/5">
          <div className="space-y-10 text-slate-mid leading-relaxed text-sm md:text-base">
            
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate mb-4 flex items-center gap-3">
                <Scale className="w-6 h-6 text-sunset flex-shrink-0" />
                1. Data Controller & Compliance
              </h2>
              <p className="mb-4">
                <strong>Travel Kin Ltd</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is a company registered in England and Wales under Company Registration Number 14782390, with its registered office in London, UK. We are the **Data Controller** in respect of your personal data processed through the Travel Kin platform under the <strong>UK General Data Protection Regulation (UK GDPR)</strong> and the <strong>Data Protection Act 2018</strong>.
              </p>
              <p>
                We are registered with the **Information Commissioner&rsquo;s Office (ICO)**, the UK supervisory authority for data protection issues. You can verify our registration on the ICO website using our registration certificate.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-sunset flex-shrink-0" />
                2. Information We Collect
              </h2>
              <p className="mb-4">
                To facilitate safe and vetted solo travel, we collect and process the following categories of data:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Identity & Verification Data:</strong> Government ID scans, biometric face matches (selfies), full legal names, and birth dates. This is processed securely via our UK-vetted biometric verification partner and is deleted within 30 days of verification.</li>
                <li><strong>Location & Safety Data:</strong> Live GPS coordinates. While using our emergency SOS button, real-time tracking is enabled to guide local emergency teams (vital interest).</li>
                <li><strong>Community Profile Data:</strong> Travel history, preferred destinations, verified social links, ratings, reviews, and crew communications.</li>
                <li><strong>Technical & Usage Data:</strong> IP addresses, browser fingerprint, device type, cookie preferences, and interaction details.</li>
              </ul>
              <div className="p-4 bg-mist rounded-2xl border border-ocean/10 text-xs">
                <p className="font-semibold text-ocean mb-1">UK Case Context — Location Vetting:</p>
                Following the Information Commissioner&rsquo;s Office (ICO) guidelines on location data processing, Travel Kin only accesses background GPS coordinates when an active trip is logged and the safety tracking feature is specifically toggled on by the user, or when an SOS trigger is initiated.
              </div>
            </div>

            {/* Legal Basis for Processing */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-sunset flex-shrink-0" />
                3. Legal Bases under UK GDPR
              </h2>
              <p className="mb-4">
                Under Article 6 of the UK GDPR, we rely on the following legal bases to process your information:
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-sunset pl-4">
                  <h4 className="font-bold text-slate text-sm">A. Contractual Necessity (Art 6(1)(b))</h4>
                  <p className="text-sm">To set up your account, process payments, and connect you with matching Crews and verified local guides for your booked trips.</p>
                </div>
                <div className="border-l-4 border-sunset pl-4">
                  <h4 className="font-bold text-slate text-sm">B. Legitimate Interests (Art 6(1)(f))</h4>
                  <p className="text-sm">To verify user profiles, monitor platform safety, moderate reviews, prevent fraudulent activities, and maintain community trust.</p>
                </div>
                <div className="border-l-4 border-sunset pl-4">
                  <h4 className="font-bold text-slate text-sm">C. Vital Interests (Art 6(1)(d))</h4>
                  <p className="text-sm">To share location coordinates with regional search-and-rescue teams during critical, life-threatening safety events or SOS triggers.</p>
                </div>
                <div className="border-l-4 border-sunset pl-4">
                  <h4 className="font-bold text-slate text-sm">D. Consent (Art 6(1)(a))</h4>
                  <p className="text-sm">For deploying non-essential analytics and marketing cookies, or when sharing optional media content within the travel feed.</p>
                </div>
              </div>
            </div>

            {/* How We Share Your Data */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-sunset flex-shrink-0" />
                4. Data Sharing & International Transfers
              </h2>
              <p className="mb-4">
                We do not sell your personal data. We only share data with:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Local Safety Teams & Rescue Crews:</strong> Essential profile and GPS data during emergencies in Southeast Asia.</li>
                <li><strong>Vetted Service Providers:</strong> Secure payment processors (Stripe), email providers, and ID validation tools.</li>
                <li><strong>Other Community Members:</strong> Limited to profile details (first name, vetted badge, travel preferences) and reviews you choose to make public.</li>
              </ul>
              <p>
                Because Travel Kin connects users for trips in Southeast Asia, some data transfers occur outside the UK. When transferring data to countries without an adequacy decision, we use **Standard Contractual Clauses (SCCs)** approved by the UK Government, alongside supplementary technical measures to ensure equivalent safeguards.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate mb-4 flex items-center gap-3">
                <Scale className="w-6 h-6 text-sunset flex-shrink-0" />
                5. Your Legal Rights
              </h2>
              <p className="mb-4">
                Under the UK GDPR, you have the following rights which you can exercise at any time:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-xs mb-4">
                <div className="p-4 bg-mist rounded-xl border border-slate/5">
                  <strong>Right to Access (SAR):</strong> Request a copy of all personal data we hold about you.
                </div>
                <div className="p-4 bg-mist rounded-xl border border-slate/5">
                  <strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete details.
                </div>
                <div className="p-4 bg-mist rounded-xl border border-slate/5">
                  <strong>Right to Erasure:</strong> Ask us to delete your personal data (the &ldquo;right to be forgotten&rdquo;).
                </div>
                <div className="p-4 bg-mist rounded-xl border border-slate/5">
                  <strong>Right to Object/Restrict:</strong> Object to processing for direct marketing or restrict processing.
                </div>
              </div>
              <p>
                To make a **Subject Access Request (SAR)** or exercise any other right, contact our Data Protection Team at <a href="mailto:privacy@travelkin.co.uk" className="text-sunset hover:underline font-semibold">privacy@travelkin.co.uk</a>. We respond to all valid requests within one calendar month, free of charge.
              </p>
            </div>

            {/* Contact & Complaints */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate mb-4 flex items-center gap-3">
                <ExternalLink className="w-6 h-6 text-sunset flex-shrink-0" />
                6. Contact & Regulatory Appeals
              </h2>
              <p className="mb-4">
                If you have questions about this policy or our data practices, please write to:
              </p>
              <address className="not-italic bg-mist p-6 rounded-2xl border border-slate/5 text-sm mb-4">
                <strong>Data Protection Officer</strong><br />
                Travel Kin Ltd<br />
                27 Old Gloucester Street, London, WC1N 3AX, United Kingdom<br />
                Email: <a href="mailto:dpo@travelkin.co.uk" className="text-sunset hover:underline font-semibold">dpo@travelkin.co.uk</a>
              </address>
              <p>
                You also have the right to lodge a complaint at any time with the **Information Commissioner&rsquo;s Office (ICO)**. However, we appreciate the chance to address your concerns directly before you contact the regulator:
              </p>
              <p className="mt-2 text-xs font-semibold text-slate flex items-center gap-1">
                ICO Helpline: 0303 123 1113 | Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-sunset hover:underline inline-flex items-center gap-0.5">ico.org.uk <ExternalLink className="w-3 h-3" /></a>
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
