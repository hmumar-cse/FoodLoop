import React from 'react';
import type { FoodItem, Claim } from '../types';
import { getUrgencyInfo } from '../utils/helpers';
import { 
  PlusCircle, 
  Scan, 
  Package, 
  Clock, 
  ShieldCheck, 
  Trash2, 
  Thermometer
} from 'lucide-react';

interface DonorDashboardProps {
  foodItems: FoodItem[];
  claims: Claim[];
  now: number;
  onOpenAddModal: () => void;
  onOpenScanModal: () => void;
  onDeleteListing: (id: string) => void;
  onSelectListing: (item: FoodItem) => void;
}

export const DonorDashboard: React.FC<DonorDashboardProps> = ({
  foodItems,
  claims,
  now,
  onOpenAddModal,
  onOpenScanModal,
  onDeleteListing,
  onSelectListing,
}) => {
  // Operational calculations
  const totalActiveServings = foodItems.reduce((acc, item) => acc + item.quantityRemaining, 0);
  const rescuedMealsCount = claims.filter(c => c.status === 'collected').reduce((acc, c) => acc + c.servingsClaimed, 0);
  const pendingClaimsCount = claims.filter(c => c.status === 'pending').length;

  return (
    <div className="space-y-4 pb-12">
      {/* Top Banner / Hero Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-md">
                Donor Operations Portal
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Commercial Entity
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Catering & Hospitality Surplus Management
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Publish excess banquet trays, bakery production, or conference lunches to verified local community recipients in minutes.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Surplus Food</span>
            </button>

            <button
              onClick={onOpenScanModal}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all"
            >
              <Scan className="w-4 h-4 text-emerald-400" />
              <span>Scan Recipient Pass</span>
              {pendingClaimsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-extrabold flex items-center justify-center ml-0.5">
                  {pendingClaimsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Operational Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 pt-5 border-t border-slate-800 text-left">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block font-medium">Active Batches</span>
            <span className="text-xl font-bold text-white mt-0.5 block">{foodItems.length}</span>
            <span className="text-[10px] text-slate-500">Live on community feed</span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block font-medium">Servings Available</span>
            <span className="text-xl font-bold text-emerald-400 mt-0.5 block">{totalActiveServings}</span>
            <span className="text-[10px] text-slate-500">Portions ready for rescue</span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block font-medium">Meals Rescued Today</span>
            <span className="text-xl font-bold text-white mt-0.5 block">{rescuedMealsCount}</span>
            <span className="text-[10px] text-emerald-400">Diverted from landfill</span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block font-medium">Pending Pickups</span>
            <span className="text-xl font-bold text-amber-400 mt-0.5 block">{pendingClaimsCount}</span>
            <span className="text-[10px] text-slate-500">Awaiting kitchen handover</span>
          </div>
        </div>
      </div>

      {/* Active Listings Manager Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Active Surplus Listings ({foodItems.length})
          </h3>
          <p className="text-xs text-slate-500">
            Manage live inventory, monitor rescue countdowns, and validate recipient QR codes
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Surplus</span>
        </button>
      </div>

      {/* Listings Cards Feed */}
      <div className="space-y-3">
        {foodItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-800">No active surplus listings</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              You currently have no food listed for rescue. Click "Add Surplus Food" to post leftover catering or bakery stock.
            </p>
            <button
              onClick={onOpenAddModal}
              className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create First Listing</span>
            </button>
          </div>
        ) : (
          foodItems.map((item) => {
            const urgency = getUrgencyInfo(item.expiryTimestamp, now);
            const isOutOfStock = item.quantityRemaining <= 0;
            const percentRemaining = Math.round((item.quantityRemaining / Math.max(1, item.initialQuantity)) * 100);

            return (
              <div
                key={item.id}
                className={`rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs p-4 transition-all ${
                  isOutOfStock ? 'bg-slate-50 opacity-75' : 'bg-white'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-start gap-3 min-w-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-slate-200"
                    />

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                          {item.category}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {item.donorType}
                        </span>
                      </div>

                      <h4 
                        onClick={() => onSelectListing(item)}
                        className="text-sm font-bold text-slate-900 leading-snug truncate cursor-pointer hover:text-emerald-700"
                      >
                        {item.title}
                      </h4>

                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                        <span>Pickup: <strong>{item.pickupWindow.start} – {item.pickupWindow.end}</strong></span>
                        <span>•</span>
                        <span className="truncate max-w-[200px]">{item.pickupAddress}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Quantity Remaining & Urgency Timer */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                    {/* Live countdown timer badge */}
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${urgency.badgeClasses}`}>
                      <span className={`w-2 h-2 rounded-full ${urgency.dotClasses}`}></span>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{urgency.formatted}</span>
                    </div>

                    {/* Quantity remaining indicator */}
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-900">
                        {item.quantityRemaining} of {item.initialQuantity} {item.unit}
                      </div>
                      <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1 ml-auto">
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${percentRemaining}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Listing Footer Actions */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Thermometer className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="text-[11px] truncate max-w-[280px]">{item.temperatureStatus}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onOpenScanModal}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200 transition-colors flex items-center gap-1 text-[11px]"
                      title="Scan a recipient's code to decrement this listing"
                    >
                      <Scan className="w-3 h-3 text-emerald-600" />
                      <span>Scan QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Remove listing "${item.title}" from active rescue feed?`)) {
                          onDeleteListing(item.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded-lg"
                      title="Delete listing"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
