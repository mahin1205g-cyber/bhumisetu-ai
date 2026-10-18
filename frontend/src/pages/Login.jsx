import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../api';
import { User, Lock, Eye, EyeOff, Shield, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Login({ setActiveTab }) {
  const { lang, t, loginUser, switchDemoRole } = useApp();

  const [identifier, setIdentifier] = useState('citizen@landguard.gov.bd');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError(lang === 'bn' ? 'ব্যবহারকারী নাম/ইমেইল ও পাসওয়ার্ড পূরণ করুন।' : 'Please enter your username/email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.login(identifier, password);
      loginUser(res.user, res.token);
      setActiveTab('dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    switchDemoRole(role);
    setActiveTab(role === 'officer' ? 'officer-review' : role === 'admin' ? 'admin' : 'dashboard');
  };

  return (
    <div className="gov-container py-12 max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-[#0b462d] border-2 border-[#c59b27] flex items-center justify-center mx-auto text-[#ffd700] font-bold text-lg shadow">
          LG
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {lang === 'bn' ? 'ডিজিটাল ভূমি সেবা পোর্টালে লগইন' : 'Sign in to LandGuard AI'}
        </h1>
        <p className="text-xs text-gray-500">
          {lang === 'bn' ? 'নাগরিক ও কর্মকর্তা ড্যাশবোর্ডে প্রবেশ করতে লগইন করুন' : 'Access your citizen or officer verification workspace'}
        </p>
      </div>

      {/* 1-Click Demo Logins */}
      <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-2 text-xs">
        <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
          {lang === 'bn' ? '১-ক্লিকে ডেমো অ্যাকাউন্টে প্রবেশ:' : '1-Click Quick Demo Login:'}
        </span>
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleDemoLogin('citizen')}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-emerald-300 dark:border-emerald-800 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 transition shadow-sm text-center"
          >
            {lang === 'bn' ? '👤 নাগরিক' : '👤 Citizen'}
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('officer')}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-800 text-[11px] font-bold text-blue-800 dark:text-blue-300 hover:bg-blue-100 transition shadow-sm text-center"
          >
            {lang === 'bn' ? '🏛️ কর্মকর্তা' : '🏛️ Officer'}
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('admin')}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-800 text-[11px] font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-100 transition shadow-sm text-center"
          >
            {lang === 'bn' ? '⚙️ অ্যাডমিন' : '⚙️ Admin'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs">
          {error}
        </div>
      )}

      {/* Main Login Form */}
      <div className="gov-card p-6 space-y-4">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {lang === 'bn' ? 'ইমেইল বা ব্যবহারকারী নাম' : 'Email or Username'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="citizen@landguard.gov.bd"
                className="gov-input pl-9"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="gov-input pl-9 pr-9"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gov-btn-primary justify-center text-xs py-2.5 font-bold shadow"
          >
            {loading ? (lang === 'bn' ? 'যাচাই হচ্ছে...' : 'Signing in...') : (lang === 'bn' ? 'লগইন করুন' : 'Sign In')}
          </button>
        </form>

        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-gray-500">
          <span>{lang === 'bn' ? 'নতুন নাগরিক?' : 'New citizen?'} </span>
          <button
            onClick={() => setActiveTab('register')}
            className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
          >
            {lang === 'bn' ? 'এখানে নিবন্ধন করুন' : 'Register here'}
          </button>
        </div>
      </div>
    </div>
  );
}
