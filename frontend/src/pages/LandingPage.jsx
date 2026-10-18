import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import BhumiSathiLogo from '../components/BhumiSathiLogo';
import {
  ShieldCheck, FileCheck2, GitBranchPlus, AlertOctagon, ArrowRight,
  Sparkles, CheckCircle2, ChevronRight, HelpCircle, FileText, QrCode
} from 'lucide-react';

export default function LandingPage({ setActiveTab }) {
  const { lang, t } = useApp();
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    {
      id: 'deed-verify',
      badge: lang === 'bn' ? 'দলিল যাচাই' : 'Deed Verify',
      title: lang === 'bn' ? 'ডিজিটাল দলিল ও মালিকানা যাচাই' : 'Deed & Ownership Verification',
      desc: lang === 'bn'
        ? 'দলিল নম্বর, রেজিস্ট্রেশন সাল, মৌজা ও দাগ নম্বরের তথ্যের সাথে সাব-রেজিস্ট্রি বালাম রেকর্ডের মিল পরীক্ষা। কৃত্রিম এআই ও অপটিক্যাল টেক্সট এক্সট্রাকশন দ্বারা নাম, দাগ ও পরিমাণের গরমিল শনাক্তকরণ।'
        : 'Cross-reference submitted deed details against sub-registry demo balam books. AI discrepancy engine highlights mismatched plot IDs, owner names, and area anomalies.',
      icon: FileCheck2,
      color: 'emerald',
      cta: lang === 'bn' ? 'দলিল যাচাই করুন' : 'Verify Deed'
    },
    {
      id: 'mutation',
      badge: lang === 'bn' ? 'ই-নামজারি' : 'E-Namjari',
      title: lang === 'bn' ? 'স্মার্ট ই-নামজারি ও ওয়ার্কফ্লো' : 'Smart E-Namjari & Mutation Workflow',
      desc: lang === 'bn'
        ? 'নাগরিকদের জন্য সহজ নির্দেশিত নামজারি আবেদন ফরম, খসড়া সংরক্ষণ ও রিয়েলটাইম টাইমলাইন ট্র্যাকিং। এসি ল্যান্ড ও ভূমি কর্মকর্তাদের জন্য অনুমোদন, খারিজ ও শুনানির পূর্ণাঙ্গ ড্যাশবোর্ড।'
        : 'Guided mutation filing wizard with draft saving and transparent visual timeline tracking. Comprehensive AC Land officer portal for review, notice dispatch, and approval audit trails.',
      icon: GitBranchPlus,
      color: 'blue',
      cta: lang === 'bn' ? 'নামজারি আবেদন' : 'Apply Mutation'
    },
    {
      id: 'due-diligence',
      badge: lang === 'bn' ? 'স্বত্ব যাচাই' : 'Due Diligence',
      title: lang === 'bn' ? 'জমি কেনার আগে প্রাক-ক্রয় যাচাই' : 'Citizen Due Diligence Pre-Purchase',
      desc: lang === 'bn'
        ? 'জমি কেনার বায়না বা চুক্তির পূর্বে প্লটের স্বত্ব ধারাবাহিকতা, একাধিকবার বিক্রির ঝুঁকি, দ্রুত হস্তান্তর, অধিগ্রহণ নোটিশ বা দেওয়ানি বিরোধ যাচাই করে সার্বিক ঝুঁকি স্কোর (০-১০০) ও রিপোর্ট প্রদান।'
        : 'Pre-purchase parcel scrutiny for prospective buyers. Evaluates title chain breaks, duplicate deed histories, rapid flipping anomalies, and acquisition flags with transparent risk scores.',
      icon: AlertOctagon,
      color: 'amber',
      cta: lang === 'bn' ? 'ঝুঁকি যাচাই করুন' : 'Assess Land Risk'
    }
  ];

  const faqs = [
    {
      q: lang === 'bn' ? 'ভূমিসাথী (BhumiSathi) কীভাবে কাজ করে?' : 'How does BhumiSathi work?',
      a: lang === 'bn'
        ? 'ভূমিসাথী ব্যবহারকারীর প্রদত্ত দলিল ও জমির তথ্যের সাথে সিন্থেটিক বালাম ডেটাবেজের রেকর্ড মিলিয়ে দেখে। কোনো গরমিল বা অস্বাভাবিকতা (যেমন: একাধিকবার বিক্রি, মালিকানা অসঙ্গতি) থাকলে তা নিয়মতান্ত্রিক ও আধুনিক এআই এলগরিদম ব্যবহারের মাধ্যমে রিয়েলটাইমে চিহ্নিত করে।'
        : 'BhumiSathi cross-references submitted property details against synthetic demo land records. Conflicting buyer names, duplicate plot sales, and rapid transfer patterns are flagged using transparent rule-based and anomaly detection engines.'
    },
    {
      q: lang === 'bn' ? 'এটি কি সরকারি কোনো লাইভ ডেটাবেজ ব্যবহার করে?' : 'Does this platform access live government land databases?',
      a: lang === 'bn'
        ? 'না। নাগরিক ও ডেটার সম্পূর্ণ সুরক্ষা নিশ্চিত করতে এটি স্বয়ংক্রিয় নিয়ম ও আধুনিক এআই এলগরিদম ব্যবহারের মাধ্যমে রিয়েলটাইমে কাজ করে।'
        : 'No. The platform utilizes automated rule validation and AI anomaly detection algorithms to safeguard user data integrity.'
    },
    {
      q: lang === 'bn' ? 'রিপোর্টে কিউআর কোড কী নির্দেশ করে?' : 'What does the QR code on reports represent?',
      a: lang === 'bn'
        ? 'প্রতিটি যাচাইয়ের পর সিস্টেম একটি অনন্য রেফারেন্স কোড ও কিউআর তৈরি করে, যা স্ক্যান করলে সরাসরি ভূমিসাথী প্ল্যাটফর্মে সংরক্ষিত যাচাইয়ের ফলাফল প্রদর্শন করে।'
        : 'Each verification generates a unique reference and verifiable QR code pointing directly to the validation URL within the BhumiSathi platform.'
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section with Fluid Ambient Animations */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b462d] via-[#093522] to-[#072417] text-white py-14 sm:py-20 px-4 border-b-4 border-[#c59b27]">
        {/* Soft Ambient Floating Glow Orbs */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl hero-glow-orb pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-[#c59b27]/20 blur-3xl hero-glow-orb pointer-events-none" style={{ animationDelay: '3.5s' }} />

        <div className="gov-container relative z-10 text-center max-w-4xl mx-auto space-y-6">
          {/* Logo with 3D Float Animation */}
          <div className="flex justify-center">
            <BhumiSathiLogo size={78} className="w-16 h-16 sm:w-20 sm:h-20 animate-float-slow drop-shadow-2xl" />
          </div>

          {/* 3D Typography Brand Headline with Smooth Entrance Animation */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight space-y-3 animate-fade-up">
            <span className="text-3d-white block tracking-normal hover:scale-[1.01] transition-transform duration-300">
              {lang === 'bn' ? 'ভূমি নিরাপত্তা ও জালিয়াতি প্রতিরোধে' : 'Land Security & Fraud Prevention'}
            </span>
            <div className="pt-1">
              <span className="inline-block px-5 py-2 sm:px-8 sm:py-2.5 rounded-2xl bg-black/40 dark:bg-black/60 border border-emerald-500/30 backdrop-blur-md shadow-xl text-3d-gold text-2xl sm:text-4xl lg:text-5xl font-extrabold animate-glow">
                {lang === 'bn' ? 'ডিজিটাল ইন্টেলিজেন্ট প্ল্যাটফর্ম' : 'Digital Intelligent Platform'}
              </span>
            </div>
          </h1>

          {/* Subtitle without personal name */}
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {lang === 'bn'
              ? 'ডিজিটাল দলিল ও মালিকানা যাচাই, স্মার্ট ই-নামজারি ওয়ার্কফ্লো এবং জমি কেনার পূর্বে নাগরিক স্বত্ব ঝুঁকি নিরূপণের সম্পূর্ণ আধুনিক সমন্বিত প্ল্যাটফর্ম।'
              : 'Digital Deed Verification, Smart E-Namjari Workflow, and Pre-Purchase Due Diligence for Safer Land Decisions.'}
          </p>


          {/* 3D Pressable Action Buttons (Screenshot 1) */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => setActiveTab('deed-verify')}
              className="btn-3d-press btn-3d-gold text-sm px-8 py-3.5 group font-bold tracking-wide"
            >
              <span>{lang === 'bn' ? 'যাচাই শুরু করুন' : 'Start Verification'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className="btn-3d-press btn-3d-dark px-7 py-3.5 text-sm font-semibold tracking-wide"
            >
              {t('navDashboard')}
            </button>
          </div>
        </div>
      </section>

      {/* Modern Land Security Solutions — Ultra-Premium 3D Feature Boxes (Screenshots 4 & 5) */}
      <section className="gov-container">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            <span className="text-3d-emerald">
              {lang === 'bn' ? 'ভূমি সুরক্ষার আধুনিক ডিজিটাল সমাধান' : 'Modern Digital Land Security Solutions'}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {lang === 'bn'
              ? 'নাগরিক সেবা সহজীকরণ, দ্রুততম বাইনারি সার্চ এবং ভূমি সুরক্ষায় আধুনিক প্রযুক্তি।'
              : 'Empowering citizens, ensuring transparency, and securing property investments with O(log N) fast algorithms.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {features.map(f => {
            const Icon = f.icon;
            const colorThemes = {
              emerald: {
                topLip: 'from-emerald-500 via-teal-400 to-emerald-600',
                iconBg: 'from-emerald-50 to-emerald-100/90 dark:from-emerald-950/80 dark:to-emerald-900/60',
                iconColor: 'text-[#0b462d] dark:text-emerald-400',
                iconBorder: 'border-emerald-200/80 dark:border-emerald-700/60',
                badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800',
                glow: 'bg-emerald-500/10'
              },
              blue: {
                topLip: 'from-blue-500 via-sky-400 to-indigo-600',
                iconBg: 'from-blue-50 to-sky-100/90 dark:from-blue-950/80 dark:to-blue-900/60',
                iconColor: 'text-blue-700 dark:text-blue-400',
                iconBorder: 'border-blue-200/80 dark:border-blue-700/60',
                badgeBg: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800',
                glow: 'bg-blue-500/10'
              },
              amber: {
                topLip: 'from-amber-500 via-[#febd69] to-orange-500',
                iconBg: 'from-amber-50 to-amber-100/90 dark:from-amber-950/80 dark:to-amber-900/60',
                iconColor: 'text-[#c59b27] dark:text-amber-400',
                iconBorder: 'border-amber-200/80 dark:border-amber-700/60',
                badgeBg: 'bg-[#fef9e7] text-[#c59b27] border-[#c59b27]/30 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800',
                glow: 'bg-amber-500/10'
              }
            }[f.color] || {
              topLip: 'from-emerald-500 to-teal-600',
              iconBg: 'from-emerald-50 to-emerald-100',
              iconColor: 'text-emerald-700',
              iconBorder: 'border-emerald-200',
              badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
              glow: 'bg-emerald-500/10'
            };

            return (
              <div
                key={f.id}
                className="card-3d-premium p-7 flex flex-col justify-between overflow-hidden relative group"
              >
                {/* Top 3D Beveled Glow Lip */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${colorThemes.topLip} shadow-sm`} />

                {/* Ambient Glow in Corner on hover */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full ${colorThemes.glow} blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />

                <div className="space-y-5 relative z-10">
                  <div className="flex items-center justify-between">
                    {/* 3D Elevated Icon Box */}
                    <div className={`icon-box-3d w-14 h-14 bg-gradient-to-br ${colorThemes.iconBg} ${colorThemes.iconColor} border ${colorThemes.iconBorder} flex items-center justify-center group-hover:rotate-3 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Metallic Embossed Badge */}
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-sm ${colorThemes.badgeBg}`}>
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#0b462d] dark:group-hover:text-emerald-400 transition-colors duration-200 leading-snug">
                    {f.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                {/* 3D Pressable Button */}
                <div className="pt-7 relative z-10">
                  <button
                    onClick={() => setActiveTab(f.id)}
                    className="w-full btn-3d-press py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-[#16241c] hover:bg-emerald-50 dark:hover:bg-[#1b2f24] text-gray-800 dark:text-emerald-300 border border-gray-300/80 dark:border-emerald-700/50 shadow-md group-hover:border-emerald-600 dark:group-hover:border-emerald-400 flex items-center justify-center gap-2 group/btn transition-all duration-200"
                    style={{
                      boxShadow: '0 3px 0 rgba(0, 0, 0, 0.08), 0 6px 12px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    <span>{f.cta}</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-200 text-[#0b462d] dark:text-emerald-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4-Step Verification Workflow with 3D Spheres & Depth (Screenshots 4 & 5) */}
      <section className="gov-container bg-gradient-to-b from-emerald-50/80 via-emerald-50/40 to-white dark:from-[#0d1612] dark:to-[#090f0c] p-8 sm:p-10 rounded-3xl border border-emerald-200/70 dark:border-emerald-900/50 shadow-xl relative overflow-hidden">
        <div className="text-center max-w-xl mx-auto mb-9 space-y-2 relative z-10">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
            <span className="text-3d-emerald">
              {lang === 'bn' ? '৪টি সহজ ধাপে ডিজিটাল যাচাইকরণ প্রক্রিয়া' : '4-Step Verification Workflow'}
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {lang === 'bn' ? 'স্বচ্ছ, নিরাপদ ও নির্ভুল স্বয়ংক্রিয় বিশ্লেষণ' : 'Transparent, secure, and automated analysis'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 text-center relative z-10">
          {[
            { step: '১', title: lang === 'bn' ? 'তথ্য বা দলিল প্রদান' : 'Input or Upload Deed', desc: lang === 'bn' ? 'দলিল নম্বর বা পিডিএফ ফাইল সাবমিট করুন' : 'Submit deed number or upload scanned PDF' },
            { step: '২', title: lang === 'bn' ? 'এআই টেক্সট এক্সট্রাকশন' : 'AI Extraction', desc: lang === 'bn' ? 'ক্রেতা, বিক্রেতা, দাগ ও খতিয়ান স্বয়ংক্রিয় শনাক্তকরণ' : 'Auto-extract parties, plot ID, and khatian' },
            { step: '৩', title: lang === 'bn' ? 'বালাম রেকর্ডের সাথে তুলনা' : 'Demo Record Match', desc: lang === 'bn' ? 'মালিকানা ধারা ও অসঙ্গতি বিশ্লেষণ' : 'Cross-check chain of title and conflicts' },
            { step: '৪', title: lang === 'bn' ? 'ভেরিফায়েড রিপোর্ট ও কিউআর' : 'Verified QR Report', desc: lang === 'bn' ? 'অনন্য রেফারেন্সসহ ডিজিটাল সনদপত্র' : 'Digital certificate with verifiable demo QR' }
          ].map((s, idx) => (
            <div
              key={idx}
              className="step-3d-card p-5 flex flex-col items-center justify-between relative group"
            >
              {/* Top 3D reflection highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent rounded-t-xl" />

              <div className="space-y-3 flex flex-col items-center">
                {/* 3D Sphere Badge */}
                <div className="step-3d-sphere">
                  {s.step}
                </div>

                <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white group-hover:text-[#0b462d] dark:group-hover:text-emerald-400 transition-colors duration-200">
                  {s.title}
                </h4>

                <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="gov-container max-w-3xl">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
          {lang === 'bn' ? 'সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)' : 'Frequently Asked Questions'}
        </h3>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="gov-card overflow-hidden cursor-pointer"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="p-4 flex items-center justify-between gap-2 font-semibold text-xs sm:text-sm text-gray-900 dark:text-white">
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#c59b27]" />
                  {f.q}
                </span>
                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
              </div>
              {openFaq === i && (
                <div className="px-4 pb-4 pt-1 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800 leading-relaxed bg-gray-50/50 dark:bg-gray-800/30">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
