export type FoodCategory = 'Cooked Meals' | 'Baked Goods' | 'Packaged Foods';

export type DonorType = 
  | 'Kalyana Mandapam (Marriage Hall)' 
  | 'Temple Annadhanam Trust' 
  | 'Hotel & Banquet Hall' 
  | 'Corporate IT Canteen' 
  | 'Bakery & Sweet Stall'
  | 'Catering Service';

export interface FoodItem {
  id: string;
  title: string;
  category: FoodCategory;
  donorName: string;
  donorType: DonorType;
  isVerifiedDonor: boolean;
  quantityRemaining: number;
  initialQuantity: number;
  unit: string;
  distanceKm: number;
  expiryTimestamp: number; // ms epoch
  pickupWindow: {
    start: string;
    end: string;
  };
  pickupAddress: string;
  pickupInstructions: string;
  donorContact: {
    name: string;
    phone: string;
    department?: string;
  };
  dietaryTags: string[];
  temperatureStatus: string;
  imageUrl: string;
  createdAt: number;
}

export interface Claim {
  id: string; // e.g. FL-8492-TN
  foodItemId: string;
  foodTitle: string;
  donorName: string;
  servingsClaimed: number;
  claimedAt: number;
  expiryTimestamp: number;
  pickupAddress: string;
  pickupInstructions: string;
  pickupWindow: {
    start: string;
    end: string;
  };
  status: 'pending' | 'collected' | 'cancelled' | 'expired';
  qrPayload: string;
  verificationCode: string; // e.g. "8492" (4-digit pickup handover OTP)
  recipientName?: string;
  trustName?: string;
  recipientPhone?: string;
  collectedAt?: number;
  collectedBy?: string;
}

export type UserRole = 'recipient' | 'donor';

export type SortOption = 'smart_match' | 'urgency' | 'distance';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationName?: string;
  phone?: string;
}
