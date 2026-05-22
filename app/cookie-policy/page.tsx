"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Cookie, Shield, Info, Settings, HelpCircle, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { MobileMenu } from "@/components/MobileMenu";
import { Footer } from "@/components/Footer";

export default function CookiePolicyPage() {
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
            alt="Cookie Policy"
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
            <Cookie className="w-4 h-4 text-sunset" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Legal Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-md">
            Cookie Policy
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto font-medium">
            How we use cookies and tracking technologies in compliance with PECR and UK GDPR.
          </p>
        </div>
      </section>

      {/* Document Information Bar */}
      <div className="bg-slate-mid text-white/60 py-4 px-6 border-b border-white/5 text-center text-xs">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6">
          <span><strong>Effective Date:</strong> May 22, 2026</span>
          <span><strong>Jurisdiction:</strong> United Kingdom (PECR / ICO Guidelines)</span>
          <span><strong>Version:</strong> 2.0</span>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16 px-6 bg-sand">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate/5">
          <div className="space-y-10 text-slate-mid leading-relaxed text-sm md:text-base">
            
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate mb-4 flex items-center gap-3">
                <Info className="w-6 h-6 text-sunset flex-shrink-0" />
                1. What Are Cookies?
              </h2>
              <p className="mb-4">
                Cookies are small text files stored on your computer, mobile device, or tablet when you visit websites. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
              </p>
              <p>
                In this policy, we refer to all cookies, web beacons, tracking pixels, and local storage technologies collectively as &ldquo;cookies&rdquo;.
              </p>
            </div>

            {/* PECR Compliance */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-sunset flex-shrink-0" />
                2. UK PECR & ICO Compliance Guidelines
              </h2>
              <p className="mb-4">
                In the United Kingdom, the use of cookies is regulated by the <strong>Privacy and Electronic Communications Regulations 2003 (PECR)</strong> and the <strong>UK General Data Protection Regulation (UK GDPR)</strong>. 
              </p>
              <div className="p-4 bg-mist rounded-2xl border border-ocean/10 text-xs mb-4">
                <p className="font-semibold text-ocean mb-1">UK Case Context — PECR Consent Rules:</p>
                In alignment with the **Information Commissioner&rsquo;s Office (ICO)** cookie guidelines, Travel Kin operates a strict opt-in framework. No non-essential cookies (such as analytics or behavioral trackers) are loaded on your device until you have given your active, explicit consent via our cookie banner.
              </div>
              <p>
                Under PECR, we do not require your consent for &ldquo;strictly necessary&rdquo; cookies, which are essential to provide the service you explicitly requested (for example, logging into your account securely).
              </p>
            </div>

            {/* Cookie Categories */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate mb-4 flex items-center gap-3">
                <Settings className="w-6 h-6 text-sunset flex-shrink-0" />
                3. Cookie Categories We Use
              </h2>
              <p className="mb-4">
                We categorize the cookies used on our Platform into three main classes:
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-sunset pl-4">
                  <h4 className="font-bold text-slate text-sm">A. Strictly Necessary Cookies</h4>
                  <p className="text-sm">These cookies are vital for the operational safety, session integrity, and core navigation of our website. Without them, you cannot use essential features like secure login, payment processing via Stripe, or safety-critical alert matching.</p>
                </div>
                <div className="border-l-4 border-sunset pl-4">
                  <h4 className="font-bold text-slate text-sm">B. Performance & Analytics Cookies</h4>
                  <p className="text-sm">These cookies collect aggregated, anonymous information about how you use our Platform (such as which pages you visit most often and any errors encountered). We use this data via tools like PostHog to optimize load times and improve navigation flows.</p>
                </div>
                <div className="border-l-4 border-sunset pl-4">
                  <h4 className="font-bold text-slate text-sm">C. Functional & Preferences Cookies</h4>
                  <p className="text-sm">These cookies allow our website to remember choices you make (such as your preferred destination filters, active travel currency, or language settings) to provide a more personalized experience.</p>
                </div>
              </div>
            </div>

            {/* Cookies Used Table */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate mb-4 flex items-center gap-3">
                <Info className="w-6 h-6 text-sunset flex-shrink-0" />
                4. Inventory of Cookies
              </h2>
              <p className="mb-4">
                The specific cookies we commonly deploy on the Travel Kin platform include:
              </p>
              <div className="overflow-x-auto border border-slate/10 rounded-2xl">
                <table className="min-w-full divide-y divide-slate/10 text-left text-xs md:text-sm">
                  <thead className="bg-mist text-slate font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Cookie Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Lifespan</th>
                      <th className="p-4">Purpose Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate/10 text-slate-mid">
                    <tr>
                      <td className="p-4 font-mono font-bold text-slate">session_token</td>
                      <td className="p-4">Strictly Necessary</td>
                      <td className="p-4">Session</td>
                      <td className="p-4">Maintains your authenticated user session, protecting against CSRF attacks.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono font-bold text-slate">cookie_consent</td>
                      <td className="p-4">Strictly Necessary</td>
                      <td className="p-4">1 Year</td>
                      <td className="p-4">Stores your cookie preferences selected in our consent banner.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono font-bold text-slate">_ph_token</td>
                      <td className="p-4">Performance/Analytics</td>
                      <td className="p-4">1 Year</td>
                      <td className="p-4">Deploys anonymous tracking codes via PostHog to analyze interface usability.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono font-bold text-slate">prev_dest</td>
                      <td className="p-4">Functional</td>
                      <td className="p-4">Session</td>
                      <td className="p-4">Remembers your last searched travel destination to populate search bars automatically.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* How to Manage Cookies */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate mb-4 flex items-center gap-3">
                <Settings className="w-6 h-6 text-sunset flex-shrink-0" />
                5. How to Manage and Disable Cookies
              </h2>
              <p className="mb-4">
                You can control and manage cookies in various ways. Please note that removing or blocking cookies can impact your user experience and parts of our Platform may no longer be fully accessible.
              </p>
              <p className="mb-4">
                Most web browsers allow you to change your cookie settings. These settings will typically be found in the &ldquo;options&rdquo; or &ldquo;preferences&rdquo; menu of your browser. To understand these settings, the following links may be helpful:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4 text-xs">
                <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-sunset hover:underline inline-flex items-center gap-0.5">Cookie settings in Microsoft Edge <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-sunset hover:underline inline-flex items-center gap-0.5">Cookie settings in Firefox <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-sunset hover:underline inline-flex items-center gap-0.5">Cookie settings in Google Chrome <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-sunset hover:underline inline-flex items-center gap-0.5">Cookie settings in Safari (Mac) <ExternalLink className="w-3 h-3" /></a></li>
              </ul>
              <p>
                We also respect <strong>Global Privacy Control (GPC)</strong> signals sent by your browser, which automatically set your cookie preferences in accordance with your browser settings.
              </p>
            </div>

            {/* Updates and Contact */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate mb-4 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-sunset flex-shrink-0" />
                6. Questions & Contact
              </h2>
              <p className="mb-4">
                We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. 
              </p>
              <p>
                If you have any questions or concerns about our use of cookies, please email our Data Protection Officer at <a href="mailto:dpo@travelkin.co.uk" className="text-sunset hover:underline font-semibold">dpo@travelkin.co.uk</a>.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
