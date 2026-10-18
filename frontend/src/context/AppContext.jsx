import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';
import { api, setToken } from '../api';

const AppContext = createContext();

export function AppProvider({ children }) {
  // 1. Language state: default 'bn'
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lg_lang') || 'bn';
  });

  // 2. Theme state: default 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('lg_theme') || 'light';
  });

  // 3. User state: demo citizen default
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('lg_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.role === 'admin') {
          return {
            ...parsed,
            name: "Md Bayazid Hossain",
            email: "dbscbayazid111@gmail.com",
            phone: "01645241040"
          };
        }
        return parsed;
      } catch (e) {
        // fallback
      }
    }
    return null;
  });

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Sync lang
  useEffect(() => {
    localStorage.setItem('lg_lang', lang);
  }, [lang]);

  // Sync theme to DOM
  useEffect(() => {
    localStorage.setItem('lg_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync user
  useEffect(() => {
    if (user) {
      localStorage.setItem('lg_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('lg_user');
    }
  }, [user]);

  // Fetch notifications
  const refreshNotifications = async () => {
    try {
      if (user) {
        const notifs = await api.getNotifications(user.id, user.role);
        setNotifications(notifs);
        setUnreadCount(notifs.filter(n => !n.is_read).length);
      }
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    refreshNotifications();
    const interval = setInterval(refreshNotifications, 15000);
    return () => clearInterval(interval);
  }, [user]);

  const toggleLang = () => {
    setLang(prev => (prev === 'bn' ? 'en' : 'bn'));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['bn']?.[key] || key;
  };

  const loginUser = (userData, token) => {
    setUser(userData);
    setToken(token);
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
  };

  const switchDemoRole = async (roleName) => {
    const demoAccounts = {
      citizen: {
        id: 1,
        name: "মোঃ রফিকুল ইসলাম",
        email: "citizen@bhumisathi.gov.bd",
        role: "citizen",
        nid: "19902692518000123",
        designation: "নাগরিক"
      },
      officer: {
        id: 2,
        name: "বেগম ফরিদা পারভীন",
        email: "officer@bhumisathi.gov.bd",
        role: "officer",
        nid: "19852692518000456",
        designation: "সহকারী কমিশনার (ভূমি) / AC Land"
      },
      admin: {
        id: 3,
        name: "Md Bayazid Hossain",
        email: "dbscbayazid111@gmail.com",
        phone: "01645241040",
        role: "admin",
        nid: "19882692518000789",
        designation: "সিস্টেম আর্কিটেক্ট ও অ্যাডমিনিস্ট্রেটর"
      }
    };
    const target = demoAccounts[roleName] || demoAccounts.citizen;
    setUser(target);
    setToken(`lg-token-${target.id}-demo-session`);
    await refreshNotifications();
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        theme,
        setTheme,
        toggleTheme,
        user,
        setUser,
        loginUser,
        logoutUser,
        switchDemoRole,
        t,
        notifications,
        unreadCount,
        refreshNotifications
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
