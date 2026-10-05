import type { FoodItem } from '../types';

export const INITIAL_FOOD_ITEMS: FoodItem[] = [
  {
    id: 'food-001',
    title: 'Grand Ballroom Banquet Buffet: Herb Roasted Chicken & Wild Rice',
    category: 'Cooked Meals',
    donorName: 'The Rosewood Manor & Estates',
    donorType: 'Wedding Event',
    isVerifiedDonor: true,
    quantityRemaining: 42,
    initialQuantity: 50,
    unit: 'meals',
    distanceKm: 0.8,
    expiryTimestamp: Date.now() + (1 * 3600 + 24 * 60) * 1000, // 1h 24m remaining
    pickupWindow: {
      start: '8:30 PM',
      end: '10:00 PM',
    },
    pickupAddress: '420 Parkside Boulevard, Dock 3 (Kitchen Service Entrance)',
    pickupInstructions: 'Enter through the catering loading dock behind Gate B. Ring bell labeled "Chef\'s Dispatch". Please bring thermal insulated bags or clean containers.',
    donorContact: {
      name: 'Chef Julian Martinez',
      phone: '+1 (555) 234-8901',
      department: 'Banquet Operations',
    },
    dietaryTags: ['Halal Poultry', 'Gluten-Conscious', 'Nut-Free'],
    temperatureStatus: 'Maintained in commercial hot-holding cabinets at 65°C / 149°F',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    createdAt: Date.now() - 35 * 60 * 1000,
  },
  {
    id: 'food-002',
    title: 'Executive Conference Bento Boxes: Teriyaki Tofu, Soba & Edamame',
    category: 'Cooked Meals',
    donorName: 'Apex Financial Center Canteen',
    donorType: 'Corporate Canteen',
    isVerifiedDonor: true,
    quantityRemaining: 28,
    initialQuantity: 35,
    unit: 'boxes',
    distanceKm: 1.4,
    expiryTimestamp: Date.now() + (42 * 60) * 1000, // 42m remaining (Urgent Red)
    pickupWindow: {
      start: '8:00 PM',
      end: '9:00 PM',
    },
    pickupAddress: '100 Financial Square, Ground Level Concierge Desk',
    pickupInstructions: 'Check in with Concierge Officer Dave. Mention your FoodLoop Claim ID. Boxes are individually packaged in tamper-evident sealed compostable cartons.',
    donorContact: {
      name: 'Elena Rostova',
      phone: '+1 (555) 345-6789',
      department: 'Corporate Food Service',
    },
    dietaryTags: ['Vegetarian', 'Vegan', 'Dairy-Free'],
    temperatureStatus: 'Freshly assembled; held in insulated thermal transport bags at 60°C',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    createdAt: Date.now() - 50 * 60 * 1000,
  },
  {
    id: 'food-003',
    title: 'Fresh Artisan Sourdough Batards & Viennoiserie Croissant Assortment',
    category: 'Baked Goods',
    donorName: 'Clement & Sons Artisan Bakery',
    donorType: 'Artisan Bakery',
    isVerifiedDonor: true,
    quantityRemaining: 22,
    initialQuantity: 30,
    unit: 'portions',
    distanceKm: 0.6,
    expiryTimestamp: Date.now() + (3 * 3600 + 15 * 60) * 1000, // 3h 15m remaining (Normal Green)
    pickupWindow: {
      start: '7:30 PM',
      end: '10:45 PM',
    },
    pickupAddress: '88 Market Street, Front Register Counter',
    pickupInstructions: 'Pick up at front counter before shop lockdown. Show your QR pass to Clara. Loaves are bagged in brown unbleached kraft paper.',
    donorContact: {
      name: 'Clara Clement',
      phone: '+1 (555) 456-7890',
      department: 'Head Baker & Co-Owner',
    },
    dietaryTags: ['Vegetarian', 'Naturally Fermented', 'No Preservatives'],
    temperatureStatus: 'Ambient bakery temperature, baked fresh this morning at 6:00 AM',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    createdAt: Date.now() - 90 * 60 * 1000,
  },
  {
    id: 'food-004',
    title: 'Hotel Gala Banquet Trays: Penne All\'Arrabbiata & Steamed Market Greens',
    category: 'Cooked Meals',
    donorName: 'Grand Metropolitan Hotel & Suites',
    donorType: 'Hotel Banquet',
    isVerifiedDonor: true,
    quantityRemaining: 34,
    initialQuantity: 40,
    unit: 'servings',
    distanceKm: 2.1,
    expiryTimestamp: Date.now() + (51 * 60) * 1000, // 51m remaining (Urgent Red)
    pickupWindow: {
      start: '8:45 PM',
      end: '9:45 PM',
    },
    pickupAddress: '710 Grand Avenue, Service Ramp Door 4',
    pickupInstructions: 'Drive up service ramp to Door 4. Food service staff will verify Claim ID. Trays are stainless catering pans ready for transfer or box pickup.',
    donorContact: {
      name: 'Sous Chef Marco V.',
      phone: '+1 (555) 567-8901',
      department: 'Kitchen Dispatch',
    },
    dietaryTags: ['Vegetarian', 'Dairy-Free', 'Nut-Free'],
    temperatureStatus: 'Maintained at >63°C in warming cart',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=800&q=80',
    createdAt: Date.now() - 40 * 60 * 1000,
  },
  {
    id: 'food-005',
    title: 'Charity Fundraiser Artisan Deli Boxes: Cheeses, Crackers & Berry Tartlets',
    category: 'Packaged Foods',
    donorName: 'St. Jude Community Foundation',
    donorType: 'Wedding Event',
    isVerifiedDonor: true,
    quantityRemaining: 18,
    initialQuantity: 25,
    unit: 'boxes',
    distanceKm: 1.9,
    expiryTimestamp: Date.now() + (2 * 3600 + 40 * 60) * 1000, // 2h 40m remaining (Normal Green)
    pickupWindow: {
      start: '8:15 PM',
      end: '11:00 PM',
    },
    pickupAddress: '315 Civic Center Drive, West Annex Reception',
    pickupInstructions: 'Enter through West Annex Reception. Volunteer coordinator Sarah will hand over pre-sealed grab-and-go boxes.',
    donorContact: {
      name: 'Sarah Jenkins',
      phone: '+1 (555) 678-9012',
      department: 'Event Logistics',
    },
    dietaryTags: ['Vegetarian Options', 'Sealed Packaging', 'Refrigerated Items'],
    temperatureStatus: 'Refrigerated at 3.5°C until handover',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    createdAt: Date.now() - 60 * 60 * 1000,
  }
];

export const PHOTO_PRESETS = [
  {
    label: 'Banquet Hot Buffet (Chafing Dishes)',
    category: 'Cooked Meals',
    url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Prepared Meals & Bento Boxes',
    category: 'Cooked Meals',
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Warm Pasta & Rice Dishes',
    category: 'Cooked Meals',
    url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Fresh Breads & Pastries',
    category: 'Baked Goods',
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Artisan Baguettes & Rolls',
    category: 'Baked Goods',
    url: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Packaged Deli Boxes & Fruit Platters',
    category: 'Packaged Foods',
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Sealed Sandwiches & Wraps',
    category: 'Packaged Foods',
    url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
  }
];
