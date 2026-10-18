import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Menu, Home, LayoutDashboard, FileCheck2, GitBranchPlus, AlertOctagon,
  Layers, ClipboardCheck, History, HelpCircle, ShieldAlert, Zap
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenDrawer }) {
  const { t, user, lang } = useApp();

  const navItems = [
    { id: 'home', label: t('navHome'), icon: Home },
    { id: 'dashboard', label: t('navDashboard'), icon: LayoutDashboard },
    { id: 'deed-verify', label: t('navDeedVerify'), icon: FileCheck2, badge: 'P2', badgeColor: 'bg-emerald-600' },
    { id: 'mutation', label: t('navMutation'), icon: GitBranchPlus, badge: 'P4', badgeColor: 'bg-blue-600' },
    { id: 'due-diligence', label: t('navDueDiligence'), icon: AlertOctagon, badge: 'P5', badgeColor: 'bg-amber-600' },
    { id: 'properties', label: t('navProperties'), icon: Layers, badge: 'O(log N)', badgeColor: 'bg-purple-600' },
    ...(user?.role === 'officer' || user?.role === 'admin' ? [
      { id: 'officer-review', label: t('navOfficerReview'), icon: ClipboardCheck, badge: 'Officer', badgeColor: 'bg-indigo-600' }
    ] : []),
    ...(user?.role === 'admin' ? [
      { id: 'admin', label: t('navAdmin'), icon: ShieldAlert, badge: 'Admin', badgeColor: 'bg-rose-600' }
    ] : []),
    { id: 'audit-logs', label: t('navAudit'), icon: History },
    { id: 'help', label: t('navHelp'), icon: HelpCircle }
  ];

  return (
    <nav className="bg-[#232f3e] text-white border-b border-gray-800 shadow-sm sticky top-[82px] sm:top-[85px] z-30 overflow-x-auto scrollbar-none select-none">
      <div className="gov-container flex items-center justify-between gap-1 py-1 min-w-max">
        <div className="flex items-center gap-1">
          {/* Hamburger All Button (Matching Picture 2 & 3) */}
          <button
            onClick={onOpenDrawer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold text-white hover:bg-black/30 border border-transparent hover:border-gray-500 transition mr-1"
          >
            <Menu className="w-4 h-4 text-white" />
            <span>{lang === 'bn' ? 'সকল সেবা' : 'All'}</span>
          </button>

          {/* Nav Links */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition border ${
                  isActive
                    ? 'bg-[#131921] text-[#febd69] border-gray-600 shadow-inner'
                    : 'text-gray-200 border-transparent hover:border-gray-500 hover:bg-black/20'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#febd69]' : 'text-gray-300'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full text-white leading-none ${item.badgeColor || 'bg-gray-700'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Scalability Badge on the Right */}
        <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-mono text-gray-300 px-3 py-1 bg-black/30 rounded border border-gray-700">
          <Zap className="w-3 h-3 text-[#febd69]" />
          <span className="text-[#febd69] font-bold">Binary Search:</span>
          <span className="text-emerald-400">O(log N)</span>
          <span className="text-gray-400 text-[10px]">(500M scale)</span>
        </div>
      </div>
    </nav>
  );
}
