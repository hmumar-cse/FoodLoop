import type { FoodItem } from '../types';

export interface UrgencyInfo {
  formatted: string;
  hours: number;
  minutes: number;
  seconds: number;
  level: 'normal' | 'high' | 'urgent' | 'expired';
  badgeClasses: string;
  dotClasses: string;
}

export function getUrgencyInfo(expiryTimestamp: number, now: number): UrgencyInfo {
  const diffMs = expiryTimestamp - now;

  if (diffMs <= 0) {
    return {
      formatted: '00:00:00 (Expired)',
      hours: 0,
      minutes: 0,
      seconds: 0,
      level: 'expired',
      badgeClasses: 'bg-slate-100 text-slate-600 border border-slate-300',
      dotClasses: 'bg-slate-400',
    };
  }

  const totalSecs = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSecs / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');
  const formatted = `${hours > 0 ? `${hours}h ` : ''}${pad(minutes)}m ${pad(seconds)}s left`;

  // Normal (> 2 hrs left): Green badge
  // High (1-2 hrs left): Yellow badge
  // Urgent (< 1 hr left): Pulsing Red badge
  if (hours >= 2) {
    return {
      formatted,
      hours,
      minutes,
      seconds,
      level: 'normal',
      badgeClasses: 'bg-emerald-50 text-emerald-800 border border-emerald-300',
      dotClasses: 'bg-emerald-500',
    };
  } else if (hours >= 1) {
    return {
      formatted,
      hours,
      minutes,
      seconds,
      level: 'high',
      badgeClasses: 'bg-amber-50 text-amber-800 border border-amber-300',
      dotClasses: 'bg-amber-500',
    };
  } else {
    return {
      formatted,
      hours,
      minutes,
      seconds,
      level: 'urgent',
      badgeClasses: 'bg-rose-50 text-rose-700 border border-rose-300 animate-pulse font-semibold',
      dotClasses: 'bg-rose-500',
    };
  }
}

/**
 * Smart Rescue Match sorting algorithm:
 * Order listings by urgency score = (1 / hours_remaining) * (1 / distance_km)
 */
export function calculateSmartRescueScore(item: FoodItem, now: number): number {
  const diffMs = Math.max(1000, item.expiryTimestamp - now);
  const hoursRemaining = diffMs / (1000 * 3600);
  const distanceKm = Math.max(0.1, item.distanceKm);

  // Exact formula specified in prompt: (1 / hours_remaining) * (1 / distance_km)
  const baseScore = (1 / hoursRemaining) * (1 / distanceKm);

  // Slight bonus for listings with remaining servings needing rescue
  const quantityWeight = Math.min(1.5, Math.log10(Math.max(1, item.quantityRemaining)) * 0.1);
  return baseScore * (1 + quantityWeight);
}

export function generateClaimId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const char1 = chars.charAt(Math.floor(Math.random() * chars.length));
  const char2 = chars.charAt(Math.floor(Math.random() * chars.length));
  return `FL-${randomNum}-${char1}${char2}`;
}

export const STORAGE_KEYS = {
  FOOD_ITEMS: 'foodloop_items_v1',
  CLAIMS: 'foodloop_claims_v1',
  ROLE: 'foodloop_user_role_v1',
  LOCATION: 'foodloop_user_location_v1',
  USER: 'foodloop_user_v1',
  REGISTERED_USERS: 'foodloop_registered_users_v1',
};
