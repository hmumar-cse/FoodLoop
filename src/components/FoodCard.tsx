import React from 'react';
import type { FoodItem } from '../types';
import { getUrgencyInfo } from '../utils/helpers';
import { 
  ShieldCheck, 
  MapPin, 
  Package, 
  Clock, 
  ChevronRight, 
  Thermometer 
} from 'lucide-react';

interface FoodCardProps {
  item: FoodItem;
  now: number;
  onSelect: (item: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, now, onSelect }) => {
  const urgency = getUrgencyInfo(item.expiryTimestamp, now);
  const isOutOfStock = item.quantityRemaining <= 0;
  const isExpired = urgency.level === 'expired';

  return (
    <div 
      onClick={() => !isOutOfStock && !isExpired && onSelect(item)}
      className={`group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col cursor-pointer ${
        isOutOfStock || isExpired ? 'opacity-70 grayscale-[30%]' : ''
      }`}
    >
      {/* Card Cover Image & Urgency Overlay */}
      <div className="relative h-44 sm:h-48 w-full bg-slate-100 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          onError={(e) => {
            // Fallback image if network fails
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Category Tag (Top Left) */}
        <div className="absolute top-2.5 left-2.5">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900/85 text-white backdrop-blur-xs shadow-xs">
            {item.category}
          </span>
        </div>

        {/* Live Rescue Countdown Timer (Top Right) */}
        <div className="absolute top-2.5 right-2.5">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold shadow-xs ${urgency.badgeClasses}`}>
            <span className={`w-2 h-2 rounded-full ${urgency.dotClasses}`}></span>
            <Clock className="w-3.5 h-3.5" />
            <span>{urgency.formatted}</span>
          </div>
        </div>

        {/* Temperature Compliance Label (Bottom Left) */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-900/80 text-slate-100 backdrop-blur-xs">
            <Thermometer className="w-3 h-3 text-emerald-400" />
            <span className="truncate max-w-[200px]">{item.temperatureStatus}</span>
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Donor Row & Verified Badge */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-xs font-semibold text-slate-700 truncate">
                {item.donorName}
              </span>
              {item.isVerifiedDonor && (
                <span className="inline-flex items-center gap-0.5 text-emerald-600 shrink-0" title="Verified Commercial Entity">
                  <ShieldCheck className="w-4 h-4 fill-emerald-100" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                    Verified
                  </span>
                </span>
              )}
            </div>

            <span className="text-[11px] text-slate-500 font-medium shrink-0">
              {item.donorType}
            </span>
          </div>

          {/* Food Title */}
          <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 mb-2 group-hover:text-emerald-700 transition-colors">
            {item.title}
          </h3>

          {/* Dietary Tags */}
          {item.dietaryTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {item.dietaryTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Metas & Claim CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 mt-1">
          {/* Quantity Left & Distance */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1 font-semibold text-slate-800">
              <Package className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {item.quantityRemaining} {item.unit} left
              </span>
            </div>

            <div className="flex items-center gap-1 text-slate-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{item.distanceKm} km away</span>
            </div>
          </div>

          {/* Action Button */}
          <div>
            {isOutOfStock ? (
              <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                Rescued
              </span>
            ) : isExpired ? (
              <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                Expired
              </span>
            ) : (
              <button
                type="button"
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
              >
                <span>Claim</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
