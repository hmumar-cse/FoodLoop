import React from 'react';
import type { UserRole, AppUser } from '../types';
import { 
  MapPin, 
  RotateCcw, 
  Ticket, 
  Building2, 
  User, 
  Globe,
  LogIn,
  LogOut
} from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeClaimsCount: number;
  onOpenMyClaims: () => void;
  onOpenLegal: (tab: 'privacy' | 'terms' | 'domain') => void;
  userDistanceRadius: number;
  onChangeRadius: (radius: number) => void;
  onResetData: () => void;
  currentUser: AppUser | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeClaimsCount,
  onOpenMyClaims,
  onOpenLegal,
  userDistanceRadius,
  onChangeRadius,
  onResetData,
  currentUser,
  onLoginClick,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900 text-white shadow-md border-b border-slate-800">
      {/* Top utility row: Custom Domain & Legal Links */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs text-slate-400 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenLegal('domain')}
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            title="Custom Domain Status"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <Globe className="w-3.5 h-3.5" />
            <span>foodloop.app</span>
          </button>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 hidden sm:inline">Certified Surplus Rescue</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenLegal('privacy')}
            className="hover:text-slate-200 transition-colors"
          >
            Privacy
          </button>
          <button
            onClick={() => onOpenLegal('terms')}
            className="hover:text-slate-200 transition-colors"
          >
            Terms
          </button>
          <button
            onClick={onResetData}
            title="Reset Mock Data"
            className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden xs:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Main Brand & Role Bar */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo & Slogan */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-900 shadow-sm shrink-0">
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
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl font-bold tracking-tight text-white m-0">FoodLoop</h1>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold px-1.5 py-0.5 rounded border border-emerald-500/30">
                  LIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-normal leading-tight">
                Rescue the surplus. Break the waste cycle.
              </p>
            </div>
          </div>

          {/* Right side: Claims & Auth Buttons */}
          <div className="flex items-center gap-2">
            {/* Recipient Quick Claims Badge */}
            {currentRole === 'recipient' && currentUser && (
              <button
                onClick={onOpenMyClaims}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                <Ticket className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">My Claims</span>
                {activeClaimsCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 text-[11px] font-bold flex items-center justify-center">
                    {activeClaimsCount}
                  </span>
                )}
              </button>
            )}

            {/* Auth Button */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <User className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="font-medium text-white truncate max-w-[100px]">{currentUser.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  title="Sign out"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/50 border border-slate-700 hover:border-rose-700 text-slate-400 hover:text-rose-300 text-xs font-medium transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Role Switcher & Location Bar */}
        <div className="mt-3 pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Role Toggle: Recipient vs Donor */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center w-full sm:w-auto">
            <button
              onClick={() => onRoleChange('recipient')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'recipient'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Recipient / Neighbour</span>
            </button>
            <button
              onClick={() => onRoleChange('donor')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'donor'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Donor (Events/Hotels/Canteens)</span>
            </button>
          </div>

          {/* User Location Indicator */}
          <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/80">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">
              Current Location: <strong className="text-white font-medium">Metro Center</strong> (within {userDistanceRadius} km)
            </span>
            <select
              value={userDistanceRadius}
              onChange={(e) => onChangeRadius(Number(e.target.value))}
              className="bg-slate-900 text-emerald-400 border border-slate-700 rounded px-1.5 py-0.5 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer ml-auto"
              title="Change search radius"
            >
              <option value={1.5}>1.5 km</option>
              <option value={3.0}>3.0 km</option>
              <option value={5.0}>5.0 km</option>
              <option value={10.0}>10.0 km</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
