import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../api';
import { Shield, User, Award, Settings, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function DemoAccountsBanner({ onResetSuccess }) {
  const { user, switchDemoRole, t, lang } = useApp();
  const [resetting, setResetting] = useState(false);
  const [resetMsg, setResetMsg] = useState('');

  const handleReset = async () => {
    if (!window.confirm(lang === 'bn' ? "আপনি কি সমস্ত ডেমো ডেটা ও রেকর্ড প্রাথমিক অবস্থায় রিসেট করতে চান?" : "Are you sure you want to reset all demo data and records?")) {
      return;
    }
    setResetting(true);
    try {
      await api.resetSeedData();
      setResetMsg(lang === 'bn' ? 'ডেমো ডেটা রিসেট সম্পন্ন হয়েছে!' : 'Demo data reset successfully!');
      if (onResetSuccess) onResetSuccess();
      setTimeout(() => setResetMsg(''), 4000);
    } catch (err) {
      alert(err.message);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="bg-[#083321] text-white border-b border-[#0f5132] px-3 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shadow-inner">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 bg-[#c59b27] text-gray-950 font-bold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">
          <Shield className="w-3 h-3" />
          {lang === 'bn' ? 'হ্যাকাথন ডেমো প্যানেল' : 'Hackathon Demo Panel'}
        </span>
        <span className="text-gray-300 hidden md:inline">
          {lang === 'bn' ? 'মূল্যায়নের জন্য দ্রুত রোল পরিবর্তন করুন:' : 'Switch roles for evaluation:'}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => switchDemoRole('citizen')}
          className={`px-2.5 py-1 rounded flex items-center gap-1 transition ${
            user?.role === 'citizen'
              ? 'bg-[#15803d] text-white font-bold ring-2 ring-white/30'
              : 'bg-black/30 text-gray-300 hover:bg-black/50 hover:text-white'
          }`}
          title="Login as Citizen: মোঃ রফিকুল ইসলাম"
        >
          <User className="w-3 h-3 text-emerald-300" />
          <span>{lang === 'bn' ? '১. নাগরিক' : '1. Citizen'}</span>
          <span className="hidden sm:inline text-[10px] text-gray-300">({user?.role === 'citizen' ? 'সক্রিয়' : 'রফিকুল'})</span>
        </button>

        <button
          onClick={() => switchDemoRole('officer')}
          className={`px-2.5 py-1 rounded flex items-center gap-1 transition ${
            user?.role === 'officer'
              ? 'bg-[#1d4ed8] text-white font-bold ring-2 ring-white/30'
              : 'bg-black/30 text-gray-300 hover:bg-black/50 hover:text-white'
          }`}
          title="Login as AC Land Officer: বেগম ফরিদা পারভীন"
        >
          <Award className="w-3 h-3 text-blue-300" />
          <span>{lang === 'bn' ? '২. সহকারী কমিশনার (ভূমি)' : '2. AC Land Officer'}</span>
          <span className="hidden sm:inline text-[10px] text-gray-300">({user?.role === 'officer' ? 'সক্রিয়' : 'ফরিদা'})</span>
        </button>

        <button
          onClick={() => switchDemoRole('admin')}
          className={`px-2.5 py-1 rounded flex items-center gap-1 transition ${
            user?.role === 'admin'
              ? 'bg-[#b45309] text-white font-bold ring-2 ring-white/30'
              : 'bg-black/30 text-gray-300 hover:bg-black/50 hover:text-white'
          }`}
          title="Login as Administrator: dbscbayazid111@gmail.com"
        >
          <Settings className="w-3 h-3 text-amber-300" />
          <span>{lang === 'bn' ? '৩. সিস্টেম অ্যাডমিন' : '3. Admin'}</span>
          <span className="hidden sm:inline text-[10px] text-gray-300">({user?.role === 'admin' ? 'সক্রিয়' : 'অ্যাডমিন'})</span>
        </button>

        <button
          onClick={handleReset}
          disabled={resetting}
          className="ml-2 px-2.5 py-1 rounded bg-rose-900/80 hover:bg-rose-800 text-rose-100 flex items-center gap-1 border border-rose-700/50 transition font-medium"
          title="Reset database to fresh synthetic seed records"
        >
          <RotateCcw className={`w-3 h-3 ${resetting ? 'animate-spin' : ''}`} />
          <span>{resetting ? (lang === 'bn' ? 'রিসেট হচ্ছে...' : 'Resetting...') : (lang === 'bn' ? 'ডেটা রিসেট' : 'Reset DB')}</span>
        </button>

        {resetMsg && (
          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-[11px] ml-1 animate-pulse">
            <CheckCircle2 className="w-3 h-3" />
            {resetMsg}
          </span>
        )}
      </div>
    </div>
  );
}
