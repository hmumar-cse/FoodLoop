import React, { useState } from 'react';
import type { AppUser, UserRole } from '../types';
import { MOCK_USERS, type UserCredentials } from '../data/mockUsers';
import { STORAGE_KEYS } from '../utils/helpers';
import {
  X,
  Mail,
  Lock,
  LogIn,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  UserPlus,
  ChevronDown,
  Building2,
  HeartHandshake,
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
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  
  // Sign In state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Sign Up state
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('recipient');
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  if (!isOpen) return null;

  const getRegisteredUsers = (): UserCredentials[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const saveRegisteredUser = (newCred: UserCredentials) => {
    const existing = getRegisteredUsers();
    const updated = [newCred, ...existing.filter((u) => u.email.toLowerCase() !== newCred.email.toLowerCase())];
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updated));
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both your email address and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Check registered users first
      const registeredUsers = getRegisteredUsers();
      const registeredMatch = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      );

      if (registeredMatch) {
        onLogin(registeredMatch.user);
        resetForm();
        return;
      }

      // Check mock demo users
      const mockMatch = MOCK_USERS.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      );

      if (mockMatch) {
        onLogin(mockMatch.user);
        resetForm();
        return;
      }

      setError('No account found with this email and password. Create an account or use a demo account below.');
      setIsLoading(false);
    }, 350);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Please enter your full name or organization name.');
      return;
    }

    if (!signupEmail.trim() || !signupEmail.includes('@') || !signupEmail.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (signupPassword.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Check if email already registered
      const registered = getRegisteredUsers();
      const alreadyExists = registered.some(
        (u) => u.email.toLowerCase() === signupEmail.trim().toLowerCase()
      );

      if (alreadyExists) {
        setError('An account with this email already exists. Please sign in instead.');
        setIsLoading(false);
        return;
      }

      const newUser: AppUser = {
        id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: name.trim(),
        email: signupEmail.trim().toLowerCase(),
        role: signupRole,
      };

      const newCred: UserCredentials = {
        email: signupEmail.trim().toLowerCase(),
        password: signupPassword,
        user: newUser,
      };

      saveRegisteredUser(newCred);
      setSuccess('Account created successfully! Logging you in...');

      setTimeout(() => {
        onLogin(newUser);
        resetForm();
      }, 500);
    }, 400);
  };

  const handleDemoLogin = (demoUser: typeof MOCK_USERS[0]) => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    setError('');
    setSuccess('');
    setIsLoading(true);

    setTimeout(() => {
      onLogin(demoUser.user);
      resetForm();
    }, 300);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setSignupEmail('');
    setSignupPassword('');
    setError('');
    setSuccess('');
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 my-auto">
        {/* Modal Header */}
        <div className="bg-slate-900 px-5 sm:px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
                <path d="M11 19h8.2a1.8 1.8 0 0 0 1.5-1 1.8 1.8 0 0 0 0-1.8L17 9.5" />
                <path d="M11 5h2" />
                <path d="M9 7l3-3 3 3" />
                <path d="m14 14 3 5" />
                <path d="m10 14-3 5" />
              </svg>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                {activeTab === 'signin' ? 'Sign in to FoodLoop' : 'Create FoodLoop Account'}
              </h2>
              <p className="text-[11px] text-slate-400">Rescue the surplus. Break the waste cycle.</p>
            </div>
          </div>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 p-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab('signin');
              setError('');
              setSuccess('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'signin'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('signup');
              setError('');
              setSuccess('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'signup'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Alerts */}
        <div className="px-5 sm:px-6 pt-4">
          {error && (
            <div className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs sm:text-sm text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-700">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}
        </div>

        {/* ─── Sign In Form ────────────────────────────────────────── */}
        {activeTab === 'signin' && (
          <form onSubmit={handleSignIn} className="p-5 sm:p-6 pt-3 space-y-3.5">
            <div>
              <label htmlFor="login-email" className="block text-xs font-bold text-slate-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-xs font-bold text-slate-700 mb-1">
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
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signup');
                  setError('');
                }}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold"
              >
                Don't have an account? <span className="underline">Create one now</span>
              </button>
            </div>
          </form>
        )}

        {/* ─── Sign Up Form ────────────────────────────────────────── */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignUp} className="p-5 sm:p-6 pt-3 space-y-3.5">
            <div>
              <label htmlFor="signup-name" className="block text-xs font-bold text-slate-700 mb-1">
                Full Name / Organization
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera or Grand Hotel"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  autoComplete="name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-xs font-bold text-slate-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="signup-email"
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Role Selection Buttons */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Select Your Role
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSignupRole('recipient')}
                  className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border text-left transition-all ${
                    signupRole === 'recipient'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <HeartHandshake className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold">Recipient</span>
                  <span className="text-[10px] text-slate-500 text-center">Claim surplus food</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSignupRole('donor')}
                  className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border text-left transition-all ${
                    signupRole === 'donor'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold">Food Donor</span>
                  <span className="text-[10px] text-slate-500 text-center">Post surplus batches</span>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account & Sign In</span>
                </>
              )}
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signin');
                  setError('');
                }}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold"
              >
                Already have an account? <span className="underline">Sign in</span>
              </button>
            </div>
          </form>
        )}

        {/* Demo Accounts Quick-Picker */}
        <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-slate-100 bg-slate-50/50">
          <button
            type="button"
            onClick={() => setShowDemoAccounts(!showDemoAccounts)}
            className="w-full flex items-center justify-between py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <span className="flex items-center gap-2">
              <UserPlus className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold">Or use Demo Accounts</span>
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDemoAccounts ? 'rotate-180' : ''}`} />
          </button>

          {showDemoAccounts && (
            <div className="mt-2.5 space-y-1.5">
              {MOCK_USERS.map((u) => (
                <button
                  key={u.user.id}
                  type="button"
                  onClick={() => handleDemoLogin(u)}
                  className="w-full text-left flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-colors group"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 truncate">{u.user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{u.email}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${
                    u.user.role === 'donor'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {u.user.role === 'donor' ? 'Donor' : 'Recipient'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
