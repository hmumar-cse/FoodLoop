import React, { useState } from 'react';
import type { AppUser } from '../types';
import { MOCK_USERS } from '../data/mockUsers';
import {
  X,
  Mail,
  Lock,
  LogIn,
  Eye,
  EyeOff,
  AlertCircle,
  UserPlus,
  ChevronDown,
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: AppUser) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const match = MOCK_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (match) {
        onLogin(match.user);
        setEmail('');
        setPassword('');
        setError('');
      } else {
        setError('Invalid email or password. Try a demo account below.');
      }
      setIsLoading(false);
    }, 400);
  };

  const handleDemoLogin = (demoUser: typeof MOCK_USERS[0]) => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    setError('');

    setIsLoading(true);
    setTimeout(() => {
      onLogin(demoUser.user);
      setEmail('');
      setPassword('');
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
                <path d="M11 19h8.2a1.8 1.8 0 0 0 1.5-1 1.8 1.8 0 0 0 0-1.8L17 9.5" />
                <path d="M11 5h2" />
                <path d="M9 7l3-3 3 3" />
                <path d="m14 14 3 5" />
                <path d="m10 14-3 5" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">Sign in to FoodLoop</h2>
              <p className="text-xs text-slate-400 mt-0.5">Rescue the surplus. Break the waste cycle.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-200 rounded-lg text-sm text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold text-sm rounded-lg transition-colors"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Accounts Section */}
        <div className="px-6 pb-6">
          <button
            type="button"
            onClick={() => setShowDemoAccounts(!showDemoAccounts)}
            className="w-full flex items-center justify-between py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <span className="flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-emerald-600" />
              <span className="font-medium">Demo Accounts</span>
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showDemoAccounts ? 'rotate-180' : ''}`} />
          </button>

          {showDemoAccounts && (
            <div className="mt-3 space-y-2">
              {MOCK_USERS.map((u) => (
                <button
                  key={u.user.id}
                  type="button"
                  onClick={() => handleDemoLogin(u)}
                  className="w-full text-left flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-colors group"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-800 group-hover:text-emerald-700">{u.user.name}</p>
                    <p className="text-xs text-slate-500">{u.email}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                    u.user.role === 'donor'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {u.user.role === 'donor' ? 'Donor' : 'Recipient'}
                  </span>
                </button>
              ))}
              <p className="text-[11px] text-slate-400 text-center pt-1">
                Password for all demo accounts is shown after selecting
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
