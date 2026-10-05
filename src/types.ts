export type FoodCategory = 'Cooked Meals' | 'Baked Goods' | 'Packaged Foods';

export type DonorType = 'Wedding Event' | 'Hotel Banquet' | 'Corporate Canteen' | 'Artisan Bakery' | 'Community Kitchen';

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
  id: string; // e.g. FL-8492-XQ
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
}

export type UserRole = 'recipient' | 'donor';

export type SortOption = 'smart_match' | 'urgency' | 'distance';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
