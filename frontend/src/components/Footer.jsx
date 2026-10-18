import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ExternalLink, HelpCircle, FileText, Code2, Heart, Award } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const { lang, t } = useApp();

  return (
    <footer className="bg-[#0c131a] text-gray-300 border-t-2 border-[#febd69] pt-10 pb-8 mt-16 text-xs">
      <div className="gov-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#131921] border-2 border-[#febd69] flex items-center justify-center font-black text-[#febd69] text-xs shadow">
                LG
              </div>
              <span className="font-extrabold text-white text-base">
                {t('appName')} — {t('appSubname')}
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-lg">
              {lang === 'bn'
                ? "ভূমি নিরাপত্তা, জালিয়াতি প্রতিরোধ ও ডিজিটাল নামজারির আধুনিক সমন্বিত প্ল্যাটফর্ম। ডিজিটাল দলিল ও বালাম যাচাই, স্মার্ট ই-নামজারি ওয়ার্কফ্লো এবং জমি ক্রয়ের পূর্বে স্বত্ব ধারাবাহিকতা ও ঝুঁকি নিরূপণের স্বয়ংক্রিয় প্রযুক্তি।"
                : "Comprehensive digital land security and fraud prevention platform. Unifying deed registry verification, smart e-namjari workflows, and pre-purchase due diligence."}
            </p>

            {/* Service Initiative Pill */}
            <div className="inline-flex items-center gap-2 bg-[#1a2636] border border-gray-700 px-3 py-1.5 rounded-lg text-xs text-emerald-300 shadow-sm">
              <Code2 className="w-4 h-4 text-[#febd69]" />
              <span className="font-semibold">
                {lang === 'bn' ? 'ডিজিটাল ভূমি সেবা ও নাগরিক সুরক্ষা উদ্যোগ' : 'Digital Land Service & Citizen Security Initiative'}
              </span>
            </div>
          </div>

          {/* Col 2: Modules */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-emerald-400">
              {lang === 'bn' ? 'প্রধান সেবাসমূহ' : 'Core Services'}
            </h4>
            <ul className="space-y-1.5 text-gray-400">
              <li>
                <button onClick={() => setActiveTab('deed-verify')} className="hover:text-emerald-300 transition">
                  • {t('navDeedVerify')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('mutation')} className="hover:text-emerald-300 transition">
                  • {t('navMutation')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('due-diligence')} className="hover:text-emerald-300 transition">
                  • {t('navDueDiligence')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('properties')} className="hover:text-emerald-300 transition">
                  • {t('navProperties')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('audit-logs')} className="hover:text-emerald-300 transition">
                  • {t('navAudit')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Help */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-[#febd69]">
              {lang === 'bn' ? 'সহায়তা ও তথ্য' : 'Support & Info'}
            </h4>
            <ul className="space-y-1.5 text-gray-400">
              <li>
                <button onClick={() => setActiveTab('help')} className="hover:text-emerald-300 transition flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-amber-400" />
                  <span>{t('navHelp')}</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('disclaimer')} className="hover:text-emerald-300 transition flex items-center gap-1">
                  <FileText className="w-3 h-3 text-emerald-400" />
                  <span>{t('navDisclaimer')}</span>
                </button>
              </li>
              <li>
                <a href="https://land.gov.bd" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" />
                  <span>ভূমি মন্ত্রণালয় (land.gov.bd)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Warning Box */}
        <div className="p-3 rounded-lg bg-black/40 border border-gray-800 text-gray-400 text-[11px] leading-relaxed mb-6">
          <strong className="text-[#febd69] block mb-0.5">
            {lang === 'bn' ? 'স্বচ্ছতা ও সুরক্ষা বার্তা:' : 'Transparency & Integrity Notice:'}
          </strong>
          {t('disclaimerBanner')}
        </div>

        <div className="pt-4 border-t border-gray-800 flex flex-wrap items-center justify-between gap-3 text-gray-400 text-[11px]">
          <div>
            © ২০২৬ ভূমিসাথী (BhumiSathi) — সর্বস্বত্ব সংরক্ষিত | নিরাপদ ডিজিটাল ভূমি সেবা ব্যবস্থা
          </div>
          <div className="flex items-center gap-4">
            <span>সংস্করণ ২.০ (হাই-স্পিড বাইনারি সার্চ)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
            <span>ফাস্টএপিআই ব্যাকএন্ড সংযুক্ত</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
