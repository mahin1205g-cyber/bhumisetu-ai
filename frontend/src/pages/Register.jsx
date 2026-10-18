import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../api';
import { User, Lock, Mail, Phone, CreditCard, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function Register({ setActiveTab }) {
  const { lang, t, loginUser } = useApp();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    nid: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError(lang === 'bn' ? 'অনুগ্রহ করে আবশ্যকীয় তথ্যগুলো পূরণ করুন।' : 'Please fill all required fields.');
      return;
    }

    if (form.password.length < 5) {
      setError(lang === 'bn' ? 'পাসওয়ার্ড ন্যূনতম ৫ অক্ষরের হতে হবে।' : 'Password must be at least 5 characters.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.register({
        ...form,
        role: 'citizen',
        designation: 'নাগরিক'
      });
      loginUser(res.user, res.token);
      setActiveTab('dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gov-container py-12 max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {lang === 'bn' ? 'নাগরিক ডিজিটাল প্রোফাইল নিবন্ধন' : 'Citizen Registration'}
        </h1>
        <p className="text-xs text-gray-500">
          {lang === 'bn' ? 'ভূমি সংক্রান্ত সেবা ও দলিল যাচাইয়ে অংশগ্রহণ করতে নিবন্ধন করুন' : 'Register to verify deeds and file mutation applications'}
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs">
          {error}
        </div>
      )}

      <div className="gov-card p-6 space-y-4">
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {lang === 'bn' ? 'পূর্ণ নাম' : 'Full Name'} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="মোঃ রফিকুল ইসলাম"
                className="gov-input pl-9"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {lang === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="citizen@example.com"
                className="gov-input pl-9"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {lang === 'bn' ? 'মোবাইল' : 'Mobile'}
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="017xxxxxxxx"
                className="gov-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {t('nid')}
              </label>
              <input
                type="text"
                name="nid"
                value={form.nid}
                onChange={handleChange}
                placeholder="এনআইডি নম্বর"
                className="gov-input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {lang === 'bn' ? 'গোপন পাসওয়ার্ড' : 'Password'} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="ন্যূনতম ৫ অক্ষর"
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
            {loading ? (lang === 'bn' ? 'নিবন্ধন হচ্ছে...' : 'Registering...') : (lang === 'bn' ? 'নিবন্ধন সম্পন্ন করুন' : 'Complete Registration')}
          </button>
        </form>

        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-gray-500">
          <span>{lang === 'bn' ? 'ইতিপূর্বে নিবন্ধিত?' : 'Already registered?'} </span>
          <button
            onClick={() => setActiveTab('login')}
            className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
          >
            {lang === 'bn' ? 'লগইন করুন' : 'Sign in here'}
          </button>
        </div>
      </div>
    </div>
  );
}
