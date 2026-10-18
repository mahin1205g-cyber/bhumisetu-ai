import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../api';
import { ShieldAlert, RotateCcw, Users, Database, CheckCircle2, RefreshCw } from 'lucide-react';

export default function AdminDashboard({ onResetSuccess }) {
  const { lang, t, user } = useApp();
  const [resetting, setResetting] = useState(false);
  const [msg, setMsg] = useState('');
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const data = await api.getDashboardStats();
      setStats(data);
    } catch (e) {}
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleReset = async () => {
    if (!window.confirm(lang === 'bn' ? "আপনি কি সমস্ত ডেটা রিসেট করতে চান?" : "Are you sure you want to reset demo database?")) return;
    setResetting(true);
    setMsg('');
    try {
      await api.resetSeedData();
      setMsg(lang === 'bn' ? 'ডাটাবেজ সফলভাবে রিসেট ও সিডিং সম্পন্ন হয়েছে!' : 'Database reset and seeded successfully!');
      await fetchStats();
      if (onResetSuccess) onResetSuccess();
    } catch (err) {
      alert(err.message);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="gov-container py-8 space-y-8 max-w-5xl">
      {/* Title */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#c59b27] uppercase tracking-wider mb-1">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>{lang === 'bn' ? 'সিস্টেম অ্যাডমিনিস্ট্রেশন' : 'System Administration'}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {lang === 'bn' ? 'সিস্টেম অ্যাডমিনিস্ট্রেটর কন্ট্রোল প্যানেল' : 'Admin Operations & System Health'}
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {lang === 'bn' ? 'ডেটাবেজ সিডিং, ডেমো রিসেট, রোল ম্যানেজমেন্ট ও সিস্টেম নির্ভরযোগ্যতা মনিটরিং।' : 'Database seeding, demo resets, role management, and system health.'}
        </p>
      </div>

      {msg && (
        <div className="p-3.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{msg}</span>
        </div>
      )}

      {/* Control Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="gov-card p-6 space-y-4 md:col-span-2">
          <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-[#0b462d] dark:text-emerald-400" />
            <span>{lang === 'bn' ? 'ডেটাবেজ রিসেট ও ফ্রেশ ডেমো সিডিং' : 'Database Reset & Clean Seeding'}</span>
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {lang === 'bn'
              ? 'সিস্টেমের সমস্ত পূর্ববর্তী টেস্ট রেকর্ড ও আবেদন মুছে দিয়ে প্রারম্ভিক ডেটাসেট (ম্যাচিং দলিল, গরমিল দলিল, একাধিকবার বিক্রি, নামজারি রেকর্ড) পুনরায় লোড করুন।'
              : 'Reset database to clean initial state with pre-seeded demonstration records.'}
          </p>

          <button
            onClick={handleReset}
            disabled={resetting}
            className="gov-btn-gold text-xs py-2.5 px-5 flex items-center gap-2 font-bold shadow"
          >
            <RotateCcw className={`w-4 h-4 ${resetting ? 'animate-spin' : ''}`} />
            <span>{resetting ? (lang === 'bn' ? 'রিসেট হচ্ছে...' : 'Resetting...') : (lang === 'bn' ? 'সম্পূর্ণ ডেটাবেজ রিসেট ও সিড করুন' : 'Reset & Re-Seed Database')}</span>
          </button>
        </div>

        <div className="gov-card p-6 space-y-4">
          <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>{lang === 'bn' ? 'সিস্টেম স্ট্যাটাস' : 'System Status'}</span>
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-500">API Backend:</span>
              <strong className="text-emerald-600">FastAPI 0.143</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-500">Database:</span>
              <strong className="text-emerald-600">SQLite 3 (Relational)</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-500">ML Engine:</span>
              <strong className="text-emerald-600">Isolation Forest (Active)</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-500">OCR Parser:</span>
              <strong className="text-emerald-600">pypdf & Regex Active</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
