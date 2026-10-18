import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Header from './components/Header';
import SlideDrawer from './components/SlideDrawer';
import Footer from './components/Footer';
import LiveChatWidget from './components/LiveChatWidget';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import DeedVerification from './pages/DeedVerification';
import VerificationResult from './pages/VerificationResult';
import SmartMutation from './pages/SmartMutation';
import ApplicationTracking from './pages/ApplicationTracking';
import OfficerReview from './pages/OfficerReview';
import DueDiligence from './pages/DueDiligence';
import DueDiligenceReport from './pages/DueDiligenceReport';
import PropertiesRegister from './pages/PropertiesRegister';
import AuditHistory from './pages/AuditHistory';
import NotificationsPage from './pages/NotificationsPage';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';
import HelpFAQ from './pages/HelpFAQ';
import DisclaimerPolicy from './pages/DisclaimerPolicy';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [dueDiligenceResult, setDueDiligenceResult] = useState(null);
  const [selectedTracking, setSelectedTracking] = useState('MUT-2026-DHK-4821');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <LandingPage setActiveTab={setActiveTab} />;
      case 'dashboard':
        return (
          <Dashboard
            setActiveTab={setActiveTab}
            setSelectedTracking={setSelectedTracking}
          />
        );
      case 'deed-verify':
        return (
          <DeedVerification
            setActiveTab={setActiveTab}
            setVerificationResult={setVerificationResult}
          />
        );
      case 'verification-result':
        return (
          <VerificationResult
            result={verificationResult}
            setActiveTab={setActiveTab}
          />
        );
      case 'mutation':
        return (
          <SmartMutation
            setActiveTab={setActiveTab}
            setSelectedTracking={setSelectedTracking}
          />
        );
      case 'mutation-track':
        return <ApplicationTracking initialTrackingNo={selectedTracking} />;
      case 'officer-review':
        return (
          <OfficerReview
            setActiveTab={setActiveTab}
            setSelectedTracking={setSelectedTracking}
          />
        );
      case 'due-diligence':
        return (
          <DueDiligence
            setActiveTab={setActiveTab}
            setDueDiligenceResult={setDueDiligenceResult}
          />
        );
      case 'due-diligence-report':
        return (
          <DueDiligenceReport
            result={dueDiligenceResult}
            setActiveTab={setActiveTab}
          />
        );
      case 'properties':
        return <PropertiesRegister setActiveTab={setActiveTab} />;
      case 'audit-logs':
        return <AuditHistory />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <UserProfile setActiveTab={setActiveTab} />;
      case 'admin':
        return <AdminDashboard onResetSuccess={() => setActiveTab('dashboard')} />;
      case 'help':
        return <HelpFAQ />;
      case 'disclaimer':
        return <DisclaimerPolicy />;
      case 'login':
        return <Login setActiveTab={setActiveTab} />;
      case 'register':
        return <Register setActiveTab={setActiveTab} />;
      default:
        return <NotFoundPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text-main)] transition-colors duration-200">
      {/* Left Slide Window / Drawer (Opened via ☰ button in Header) */}
      <SlideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Professional Amazon-Style Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        setSelectedTracking={setSelectedTracking}
      />

      {/* Main Page Area */}
      <main className="flex-1">
        {renderContent()}
      </main>

      {/* Modern Footer with Creator Credits to MD Bayazid */}
      <Footer setActiveTab={setActiveTab} />

      {/* Floating Live Chat Widget (ChatGPT-style Intelligent Assistant) */}
      <LiveChatWidget setActiveTab={setActiveTab} />
    </div>
  );
}
