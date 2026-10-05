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
  LogOut,
  HeartHandshake
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
  selectedCity: string;
  onChangeCity: (city: string) => void;
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
  selectedCity,
  onChangeCity,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900 text-white shadow-md border-b border-slate-800 pt-[env(safe-area-inset-top,0px)]">
      {/* Top utility row: Custom Domain & Legal Links */}
      <div className="bg-slate-950 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs text-slate-400 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => onOpenLegal('domain')}
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium touch-manipulation"
            title="Custom Domain Status"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <Globe className="w-3.5 h-3.5" />
            <span className="font-semibold">foodloop.app</span>
          </button>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 hidden xs:inline">Tamil Nadu Surplus Rescue</span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => onOpenLegal('privacy')}
            className="hover:text-slate-200 transition-colors py-0.5 px-1"
          >
            Privacy
          </button>
          <button
            onClick={() => onOpenLegal('terms')}
            className="hover:text-slate-200 transition-colors py-0.5 px-1"
          >
            Terms
          </button>
          <button
            onClick={onResetData}
            title="Reset to Tamil Nadu Mock Food Items"
            className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 py-0.5 px-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Brand & Actions Bar */}
      <div className="px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo & Slogan */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-900 shadow-sm shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
                <path d="M11 19h8.2a1.8 1.8 0 0 0 1.5-1 1.8 1.8 0 0 0 0-1.8L17 9.5" />
                <path d="M11 5h2" />
                <path d="M9 7l3-3 3 3" />
                <path d="m14 14 3 5" />
                <path d="m10 14-3 5" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white m-0 truncate">FoodLoop</h1>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold px-1.5 py-0.2 rounded border border-emerald-500/30">
                  TAMIL NADU
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-300 font-normal leading-tight truncate">
                Kalyana Mandapam & Annadhanam Surplus Rescue
              </p>
            </div>
          </div>

          {/* Right side: Claims Receipts & Auth Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* My Receipts / Claims Badge */}
            <button
              onClick={onOpenMyClaims}
              className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              <Ticket className="w-3.5 h-3.5 text-emerald-400" />
              <span>Receipts</span>
              {activeClaimsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-extrabold flex items-center justify-center ml-0.5">
                  {activeClaimsCount}
                </span>
              )}
            </button>

            {/* Auth Button */}
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <div className="hidden xs:flex items-center gap-1 text-xs text-slate-300 bg-slate-800 px-2 py-1.5 rounded-lg border border-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <User className="w-2.5 h-2.5 text-emerald-400" />
                  </div>
                  <span className="font-medium text-white truncate max-w-[80px] text-[11px]">{currentUser.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  title="Sign out"
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/50 border border-slate-700 hover:border-rose-700 text-slate-400 hover:text-rose-300 text-xs font-medium transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Role Switcher & Location Bar */}
        <div className="mt-2.5 pt-2.5 border-t border-slate-800/90 flex flex-col gap-2">
          {/* Role Toggle: Recipient vs Donor */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center w-full">
            <button
              onClick={() => onRoleChange('recipient')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'recipient'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Orphanage / Trust / Recipient</span>
            </button>
            <button
              onClick={() => onRoleChange('donor')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'donor'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Mandapam / Donor Hub</span>
            </button>
          </div>

          {/* Tamil Nadu Location Indicator */}
          <div className="flex items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-300 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/80">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-slate-400">Area:</span>
              <select
                value={selectedCity}
                onChange={(e) => onChangeCity(e.target.value)}
                className="bg-slate-900 text-white font-medium border border-slate-700 rounded px-1.5 py-0.5 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="T. Nagar, Chennai">T. Nagar, Chennai</option>
                <option value="Mylapore, Chennai">Mylapore, Chennai</option>
                <option value="Anna Nagar, Chennai">Anna Nagar, Chennai</option>
                <option value="RS Puram, Coimbatore">RS Puram, Coimbatore</option>
                <option value="Meenakshi Temple, Madurai">Meenakshi Temple, Madurai</option>
                <option value="Thillai Nagar, Trichy">Thillai Nagar, Trichy</option>
                <option value="Salem Junction">Salem Junction</option>
              </select>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <span className="text-slate-400 text-[10px]">Radius:</span>
              <select
                value={userDistanceRadius}
                onChange={(e) => onChangeRadius(Number(e.target.value))}
                className="bg-slate-900 text-emerald-400 border border-slate-700 rounded px-1.5 py-0.5 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
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
      </div>
    </header>
  );
};
