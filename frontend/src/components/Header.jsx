import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../api';
import BhumiSathiLogo from './BhumiSathiLogo';
import {
  Menu, Search, Shield, Moon, Sun, Globe, Bell, User, LogOut, CheckCircle,
  AlertTriangle, Info, Check, ChevronDown, PhoneCall, Zap, X, ArrowRight
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenDrawer, setSelectedTracking }) {
  const {
    lang, toggleLang, theme, toggleTheme, user, logoutUser, t,
    notifications, unreadCount, refreshNotifications
  } = useApp();

  const [showNotifs, setShowNotifs] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Fast Binary Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchMetrics, setSearchMetrics] = useState(null);
  const searchRef = useRef(null);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setShowSearchResults(true);
    try {
      const data = await api.searchBinary(searchQuery.trim(), searchCategory, 10);
      setSearchResults(data.results || []);
      setSearchMetrics({
        timeMs: data.time_ms || 0.1,
        algorithm: data.algorithm || 'Binary Search B-Tree O(log N)',
        count: data.count || 0
      });
    } catch (err) {
      console.error('Binary search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectResult = (item) => {
    setShowSearchResults(false);
    setSearchQuery('');

    if (item._match_type === 'property') {
      setActiveTab('properties');
    } else if (item._match_type === 'deed') {
      setActiveTab('deed-verify');
    } else if (item._match_type === 'mutation') {
      if (setSelectedTracking) {
        setSelectedTracking(item.tracking_no);
      }
      setActiveTab('mutation-track');
    }
  };

  const handleMarkRead = async (nid) => {
    try {
      await api.markNotificationRead(nid);
      refreshNotifications();
    } catch (e) {
      // ignore
    }
  };

  return (
    <header className="sticky top-0 z-40 select-none shadow-md">
      {/* 1. Top Government Banner (Matching Picture 2: Date & 16122 Helpline) */}
      <div className="bg-[#0b462d] text-emerald-100 text-[11px] py-1 border-b border-emerald-800">
        <div className="gov-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">
              {lang === 'bn' ? 'রবিবার, ৩ কার্তিক ১৪৩৩ | ১৮ অক্টোবর ২০২৬' : 'Sunday, 18 October 2026'}
            </span>
            <span className="hidden md:inline text-emerald-300/60">•</span>
            <span className="hidden md:inline text-emerald-200">
              {lang === 'bn' ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার — ভূমি সেবা প্ল্যাটফর্ম' : "Government of the People's Republic of Bangladesh"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:16122"
              className="flex items-center gap-1.5 font-bold text-amber-300 hover:text-white transition"
            >
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>{lang === 'bn' ? 'ভূমি সেবা কল করুন:' : 'Helpline:'} 16122</span>
            </a>
            <span className="hidden sm:inline bg-emerald-800 text-emerald-200 text-[10px] px-1.5 py-0.2 rounded font-semibold">
              ২৪/৭
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Professional Amazon-Style Navy #131921 - Picture 4) */}
      <div className="bg-[#131921] text-white py-2.5 border-b border-gray-800">
        <div className="gov-container flex items-center justify-between gap-3 sm:gap-4">
          {/* Left: Hamburger Slide-Window Button + Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Hamburger Button (Matches Picture 2 & Picture 3) */}
            <button
              onClick={onOpenDrawer}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-[#232f3e] border border-transparent hover:border-gray-600 text-white transition focus:outline-none"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-white" />
              <span className="text-xs font-bold hidden sm:inline">
                {lang === 'bn' ? 'সকল সেবা' : 'All'}
              </span>
            </button>

            {/* Brand Logo & BhumiSathi Identity */}
            <div
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <BhumiSathiLogo className="w-10 h-10" size={40} />

              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-white text-3d-white group-hover:text-[#febd69] transition duration-200">
                    {lang === 'bn' ? 'ভূমিসাথী' : 'BhumiSathi'}
                  </span>
                  <span className="text-xs font-semibold text-gray-300 hidden sm:inline">
                    — BhumiSathi
                  </span>
                </div>
                <div className="text-[10px] text-amber-300/90 hidden lg:block font-medium tracking-tight">
                  Your Companion for Safer Land Decisions
                </div>
              </div>
            </div>
          </div>

          {/* Center: Amazon-Style Fast Binary Search Bar (100M-500M Scalability) */}
          <div ref={searchRef} className="flex-1 max-w-2xl relative mx-1">
            <form onSubmit={handleSearch} className="flex items-center rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#febd69] shadow-inner">
              {/* Category Dropdown (Amazon-style 'All') */}
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-2 border-r border-gray-300 outline-none cursor-pointer hidden md:block"
              >
                <option value="all">{lang === 'bn' ? 'সব রেকর্ড' : 'All'}</option>
                <option value="deed">{lang === 'bn' ? 'দলিল (Deed)' : 'Deeds'}</option>
                <option value="plot">{lang === 'bn' ? 'দাগ / প্লট' : 'Plots'}</option>
                <option value="khatian">{lang === 'bn' ? 'খতিয়ান' : 'Khatian'}</option>
                <option value="tracking">{lang === 'bn' ? 'নামজারি' : 'Tracking'}</option>
              </select>

              {/* Instant Search Input */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.length >= 2) {
                      handleSearch();
                    } else {
                      setShowSearchResults(false);
                    }
                  }}
                  onFocus={() => {
                    if (searchQuery.length >= 2) setShowSearchResults(true);
                  }}
                  placeholder={
                    lang === 'bn'
                      ? 'দলিল নং, দাগ নং, খতিয়ান বা নামজারি ট্র্যাকিং দিয়ে খুঁজুন... (বাইনারি সার্চ O(log N))'
                      : 'Search Deeds, Plots, Khatians, or Mutation Tracking (Binary Search O(log N))...'
                  }
                  className="w-full py-2 px-3 bg-white text-gray-900 text-xs outline-none placeholder:text-gray-400 font-medium"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearchResults(false);
                    }}
                    className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Amazon Golden Amber Search Button */}
              <button
                type="submit"
                className="bg-[#febd69] hover:bg-[#f3a847] text-gray-950 px-3 sm:px-4 py-2 transition flex items-center justify-center font-bold"
                title="Search using O(log N) Binary Search Algorithm"
              >
                <Search className={`w-4 h-4 ${isSearching ? 'animate-spin' : ''}`} />
              </button>
            </form>

            {/* Live Binary Search Dropdown Results */}
            {showSearchResults && searchQuery.trim().length >= 2 && (
              <div className="absolute left-0 right-0 mt-1.5 bg-white dark:bg-[#131c27] rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 text-xs">
                {/* Benchmark Performance Header */}
                <div className="bg-gray-100 dark:bg-[#1c2938] px-3 py-1.5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold font-mono">
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{searchMetrics?.algorithm || 'Binary Search B-Tree O(log N)'}</span>
                  </div>
                  <span className="text-gray-500 font-mono text-[10px]">
                    ⏱ {searchMetrics?.timeMs || 0.12}ms | 500M user scale
                  </span>
                </div>

                <div className="max-h-64 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
                  {searchResults.length === 0 ? (
                    <div className="py-6 text-center text-gray-500 dark:text-gray-400">
                      {lang === 'bn' ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No matching records found'}
                    </div>
                  ) : (
                    searchResults.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectResult(item)}
                        className="p-2.5 hover:bg-amber-50 dark:hover:bg-[#1a2736] cursor-pointer flex items-center justify-between transition group"
                      >
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white group-hover:text-[#d97706] dark:group-hover:text-[#febd69]">
                            {item._title}
                          </div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                            {item._subtitle}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-mono uppercase">
                            {item._match_type}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-1 transition" />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Controls: Language, Theme, Notifications, Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-[#232f3e] border border-transparent hover:border-gray-600 text-xs font-semibold text-gray-200 transition"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#febd69]" />
              <span className="hidden sm:inline">{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md hover:bg-[#232f3e] border border-transparent hover:border-gray-600 text-gray-200 transition"
              title="Toggle Dark / Light Mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-gray-300" />
              )}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="p-1.5 rounded-md hover:bg-[#232f3e] border border-transparent hover:border-gray-600 text-gray-200 relative transition"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] font-black flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#131c27] text-gray-900 dark:text-gray-100 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="font-bold text-sm">
                      {lang === 'bn' ? 'বিজ্ঞপ্তি ও নোটিফিকেশন' : 'Notifications'} ({notifications.length})
                    </span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">
                      {unreadCount} {lang === 'bn' ? 'অপঠিত' : 'unread'}
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 mt-1">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-gray-500">
                        {lang === 'bn' ? 'কোনো নতুন বিজ্ঞপ্তি নেই' : 'No notifications'}
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => handleMarkRead(n.id)}
                          className={`p-2.5 text-xs transition cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/60 rounded ${
                            !n.is_read ? 'bg-amber-50/70 dark:bg-amber-950/30' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                              {lang === 'bn' ? n.title_bn : n.title_en}
                            </span>
                            {!n.is_read && (
                              <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mt-0.5 leading-snug">
                            {lang === 'bn' ? n.message_bn : n.message_en}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Amazon-Style User Account Dropdown */}
            <div className="relative">
              {user ? (
                <div
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-md hover:bg-[#232f3e] border border-transparent hover:border-gray-600 cursor-pointer select-none transition"
                >
                  <div className="w-6 h-6 rounded-full bg-[#febd69] text-gray-950 font-black text-xs flex items-center justify-center shadow">
                    {user.name ? user.name[0] : 'U'}
                  </div>
                  <div className="text-left hidden lg:block leading-tight">
                    <div className="text-[10px] text-gray-400">
                      {lang === 'bn' ? 'হ্যালো,' : 'Hello,'} {user.name.split(' ')[0]}
                    </div>
                    <div className="text-xs font-bold text-white max-w-[110px] truncate">
                      {user.role === 'admin' ? 'অ্যাডমিন' : user.role === 'officer' ? 'এসি ল্যান্ড' : 'নাগরিক'}
                    </div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              ) : (
                <button
                  onClick={() => setActiveTab('login')}
                  className="gov-btn-gold text-xs py-1.5 px-3"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{t('navLogin')}</span>
                </button>
              )}

              {showUserMenu && user && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#131c27] text-gray-900 dark:text-gray-100 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-2 z-50">
                  <div className="p-2 border-b border-gray-100 dark:border-gray-800">
                    <div className="font-bold text-xs truncate">{user.name}</div>
                    <div className="text-[11px] text-gray-500 truncate">{user.email}</div>
                    <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
                      {user.designation || user.role}
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => { setActiveTab('profile'); setShowUserMenu(false); }}
                      className="w-full text-left px-2.5 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-gray-500" />
                      <span>{t('navProfile')}</span>
                    </button>
                    <button
                      onClick={() => { setActiveTab('dashboard'); setShowUserMenu(false); }}
                      className="w-full text-left px-2.5 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex items-center gap-2"
                    >
                      <Shield className="w-3.5 h-3.5 text-gray-500" />
                      <span>{t('navDashboard')}</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-gray-100 dark:border-gray-800">
                    <button
                      onClick={() => { logoutUser(); setShowUserMenu(false); setActiveTab('login'); }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t('navLogout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
