import React, { useState } from 'react';
import type { FoodItem } from '../types';
import { getUrgencyInfo } from '../utils/helpers';
import { 
  X, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  User, 
  Thermometer, 
  Minus, 
  Plus, 
  Navigation
} from 'lucide-react';

interface FoodDetailModalProps {
  item: FoodItem | null;
  now: number;
  onClose: () => void;
  onClaim: (item: FoodItem, servings: number) => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  item,
  now,
  onClose,
  onClaim,
}) => {
  if (!item) return null;

  const [claimServings, setClaimServings] = useState<number>(1);
  const urgency = getUrgencyInfo(item.expiryTimestamp, now);
  const isOutOfStock = item.quantityRemaining <= 0;
  const isExpired = urgency.level === 'expired';

  const handleIncrement = () => {
    if (claimServings < item.quantityRemaining) {
      setClaimServings((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (claimServings > 1) {
      setClaimServings((prev) => prev - 1);
    }
  };

  const handleClaimNow = () => {
    if (isOutOfStock || isExpired) return;
    onClaim(item, claimServings);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image & Close Button */}
        <div className="relative h-52 sm:h-56 w-full bg-slate-900 shrink-0">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors shadow-sm"
            title="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Urgency Badge */}
          <div className="absolute top-3 left-3">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold shadow-sm ${urgency.badgeClasses}`}>
              <span className={`w-2 h-2 rounded-full ${urgency.dotClasses}`}></span>
              <Clock className="w-3.5 h-3.5" />
              <span>{urgency.formatted}</span>
            </div>
          </div>

          {/* Category Tag & Quantity Bottom Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-600 font-semibold shadow-xs">
              {item.category}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 font-medium backdrop-blur-xs">
              {item.quantityRemaining} {item.unit} available
            </span>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Title & Verified Entity */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-slate-700">
                {item.donorName}
              </span>
              {item.isVerifiedDonor && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Donor
                </span>
              )}
            </div>

            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {item.title}
            </h2>
          </div>

          {/* Dietary Tags */}
          {item.dietaryTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.dietaryTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Food Safety & Temperature Status */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-emerald-950">
            <Thermometer className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold text-emerald-900">Food Safety & Temperature Control</div>
              <div className="text-emerald-800 mt-0.5">{item.temperatureStatus}</div>
            </div>
          </div>

          {/* Pickup Window & Distance */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Pickup Window</span>
              </div>
              <div className="text-xs font-bold text-slate-900">
                {item.pickupWindow.start} – {item.pickupWindow.end}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Must be collected before window closes
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                <Navigation className="w-3.5 h-3.5 text-slate-400" />
                <span>Distance</span>
              </div>
              <div className="text-xs font-bold text-slate-900">
                {item.distanceKm} km away
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Approx 4–6 mins by bike / vehicle
              </div>
            </div>
          </div>

          {/* Detailed Pickup Instructions */}
          <div className="border border-slate-200 rounded-xl p-3 bg-white">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Pickup Location & Directions</span>
            </div>
            <div className="text-xs text-slate-800 font-medium mb-1.5">
              {item.pickupAddress}
            </div>
            <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 leading-relaxed">
              <strong>Staff Note:</strong> {item.pickupInstructions}
            </div>
          </div>

          {/* Donor Contact Card */}
          <div className="border border-slate-200 rounded-xl p-3 bg-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{item.donorContact.name}</div>
                <div className="text-[11px] text-slate-500">{item.donorContact.department || 'Dispatch Lead'}</div>
              </div>
            </div>

            <a
              href={`tel:${item.donorContact.phone}`}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Call Contact</span>
            </a>
          </div>

          {/* Portion Stepper */}
          {!isOutOfStock && !isExpired && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Select Portions to Claim
                </span>
                <span className="text-[11px] text-slate-500">
                  Please only claim what you can rescue and consume
                </span>
              </div>

              <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-lg p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={claimServings <= 1}
                  className="w-7 h-7 rounded-md bg-slate-100 disabled:opacity-40 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <span className="w-7 text-center font-bold text-slate-900 text-sm">
                  {claimServings}
                </span>

                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={claimServings >= item.quantityRemaining}
                  className="w-7 h-7 rounded-md bg-slate-100 disabled:opacity-40 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>

          {isOutOfStock ? (
            <div className="flex-1 py-2.5 rounded-xl bg-slate-200 text-slate-600 text-center text-xs font-bold">
              All Portions Claimed
            </div>
          ) : isExpired ? (
            <div className="flex-1 py-2.5 rounded-xl bg-rose-100 text-rose-700 text-center text-xs font-bold">
              Rescue Window Closed
            </div>
          ) : (
            <button
              type="button"
              onClick={handleClaimNow}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>CLAIM NOW</span>
              <span className="text-xs bg-emerald-700 px-2 py-0.5 rounded-md font-semibold">
                {claimServings} {claimServings === 1 ? 'Portion' : 'Portions'}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
