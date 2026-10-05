import React from 'react';
import type { FoodItem, Claim } from '../types';
import { getUrgencyInfo } from '../utils/helpers';
import { 
  PlusCircle, 
  Scan, 
  Package, 
  ShieldCheck, 
  Trash2, 
  CheckCircle2,
  HeartHandshake
} from 'lucide-react';

interface DonorDashboardProps {
  foodItems: FoodItem[];
  claims: Claim[];
  now: number;
  onOpenAddModal: () => void;
  onOpenScanModal: () => void;
  onDeleteListing: (id: string) => void;
  onSelectListing: (item: FoodItem) => void;
  onConfirmPickup?: (claimId: string) => void;
}

export const DonorDashboard: React.FC<DonorDashboardProps> = ({
  foodItems,
  claims,
  now,
  onOpenAddModal,
  onOpenScanModal,
  onDeleteListing,
  onSelectListing,
  onConfirmPickup,
}) => {
  const totalActiveServings = foodItems.reduce((acc, item) => acc + item.quantityRemaining, 0);
  const rescuedMealsCount = claims.filter(c => c.status === 'collected').reduce((acc, c) => acc + c.servingsClaimed, 0);
  const pendingClaims = claims.filter(c => c.status === 'pending');

  return (
    <div className="space-y-4 pb-12 text-left">
      {/* Top Banner / Hero Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-md">
                Donor Dashboard
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Donor
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Surplus Food Management
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 max-w-md">
              Publish excess meals and verify recipient pickups with live QR scanning and OTP codes.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Post Surplus Food</span>
            </button>

            <button
              onClick={onOpenScanModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-bold transition-all"
            >
              <Scan className="w-4 h-4 text-emerald-400" />
              <span>Verify / Scan Pass</span>
              {pendingClaims.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-extrabold flex items-center justify-center ml-0.5">
                  {pendingClaims.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Operational Statistics Cards */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-800 text-left">
          <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 block font-medium">Active Batches</span>
            <span className="text-lg font-bold text-white mt-0.5 block">{foodItems.length}</span>
            <span className="text-[9px] text-slate-500">Live in feed</span>
          </div>

          <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 block font-medium">Meals Available</span>
            <span className="text-lg font-bold text-emerald-400 mt-0.5 block">{totalActiveServings}</span>
            <span className="text-[9px] text-slate-500">Ready for pickup</span>
          </div>

          <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 block font-medium">Meals Handed Over</span>
            <span className="text-lg font-bold text-amber-400 mt-0.5 block">{rescuedMealsCount}</span>
            <span className="text-[9px] text-slate-500">Successfully verified</span>
          </div>
        </div>
      </div>

      {/* Pending Claims & Handover Queue */}
      {pendingClaims.length > 0 && (
        <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              <h3 className="text-sm font-bold text-amber-950">
                Incoming Pickups & Claims ({pendingClaims.length})
              </h3>
            </div>
            <span className="text-[11px] text-amber-800 font-medium">
              Awaiting verification at dispatch
            </span>
          </div>

          <div className="space-y-2">
            {pendingClaims.map((claim) => (
              <div
                key={claim.id}
                className="bg-white p-3 rounded-xl border border-amber-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
              >
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      {claim.id}
                    </span>
                    <span className="font-mono text-xs font-extrabold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      OTP: {claim.verificationCode || claim.id.slice(-4)}
                    </span>
                    <span className="font-bold text-slate-900 text-xs truncate max-w-[200px]">
                      {claim.foodTitle}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1 flex items-center gap-1.5">
                    <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                    <span><strong>{claim.trustName || 'Recipient'}</strong> • {claim.servingsClaimed} Meals reserved</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {onConfirmPickup && (
                    <button
                      type="button"
                      onClick={() => onConfirmPickup(claim.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirm Handover</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Listings Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-slate-900">
            Active Surplus Listings ({foodItems.length})
          </h3>
          <button
            onClick={onOpenAddModal}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post New Batch</span>
          </button>
        </div>

        {foodItems.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white rounded-2xl border border-slate-200">
            <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-700 text-xs font-bold">No active surplus batches right now.</p>
            <p className="text-slate-500 text-[11px] mt-0.5 mb-3">Post excess food from your marriage hall or catering event.</p>
            <button
              onClick={onOpenAddModal}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
            >
              + Post Surplus Food
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {foodItems.map((item) => {
              const urgency = getUrgencyInfo(item.expiryTimestamp, now);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div 
                    onClick={() => onSelectListing(item)}
                    className="flex items-center gap-3 cursor-pointer min-w-0 flex-1"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover shrink-0 border border-slate-100"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          {item.category}
                        </span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${urgency.badgeClasses}`}>
                          {urgency.formatted}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.quantityRemaining} of {item.initialQuantity} {item.unit} left • {item.donorName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 justify-between sm:justify-end">
                    <button
                      type="button"
                      onClick={() => onSelectListing(item)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteListing(item.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Remove Listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
