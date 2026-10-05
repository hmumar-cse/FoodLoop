import type { FoodItem } from '../types';

export const INITIAL_FOOD_ITEMS: FoodItem[] = [
  {
    id: 'food-001',
    title: 'Chicken Biryani & Raitha',
    category: 'Cooked Meals',
    donorName: 'Sri Meenakshi Mandapam',
    donorType: 'Kalyana Mandapam (Marriage Hall)',
    isVerifiedDonor: true,
    quantityRemaining: 65,
    initialQuantity: 80,
    unit: 'meals',
    distanceKm: 0.8,
    expiryTimestamp: Date.now() + (1 * 3600 + 15 * 60) * 1000, // 1h 15m remaining
    pickupWindow: {
      start: '2:30 PM',
      end: '4:00 PM',
    },
    pickupAddress: 'No. 45, South Masi Street, Madurai - 625001',
    pickupInstructions: 'Kitchen rear gate dispatch. Ask for Master Cook Senthil. Bring thermal carrier drums.',
    donorContact: {
      name: 'M. Senthil Nathan',
      phone: '+91 98421 54321',
      department: 'Catering Operations',
    },
    dietaryTags: ['Halal Chicken', 'Hot & Fresh', 'Seeraga Samba'],
    temperatureStatus: 'Maintained in sealed stainless-steel vessels at 68°C',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    createdAt: Date.now() - 30 * 60 * 1000,
  },
  {
    id: 'food-002',
    title: 'South Indian Full Meals',
    category: 'Cooked Meals',
    donorName: 'Sri Krishna Gana Hall',
    donorType: 'Kalyana Mandapam (Marriage Hall)',
    isVerifiedDonor: true,
    quantityRemaining: 45,
    initialQuantity: 60,
    unit: 'meal sets',
    distanceKm: 1.2,
    expiryTimestamp: Date.now() + (48 * 60) * 1000, // 48m remaining (Urgent)
    pickupWindow: {
      start: '2:45 PM',
      end: '3:45 PM',
    },
    pickupAddress: '20, Maharajapuram Santhanam Salai, T. Nagar, Chennai - 600017',
    pickupInstructions: 'Dining hall service entrance. Show FoodLoop pickup receipt. Meals packed hot.',
    donorContact: {
      name: 'K. Ramanathan',
      phone: '+91 94440 12890',
      department: 'Banquet Operations',
    },
    dietaryTags: ['Pure Vegetarian', 'Freshly Prepared', 'Rice & Sambar'],
    temperatureStatus: 'Steaming hot in insulated containers (>65°C)',
    imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
    createdAt: Date.now() - 40 * 60 * 1000,
  },
  {
    id: 'food-003',
    title: 'Sambar Rice & Curd Rice',
    category: 'Cooked Meals',
    donorName: 'Kapaleeshwarar Community Kitchen',
    donorType: 'Temple Annadhanam Trust',
    isVerifiedDonor: true,
    quantityRemaining: 80,
    initialQuantity: 100,
    unit: 'meal packets',
    distanceKm: 1.5,
    expiryTimestamp: Date.now() + (2 * 3600 + 45 * 60) * 1000, // 2h 45m remaining
    pickupWindow: {
      start: '1:30 PM',
      end: '4:30 PM',
    },
    pickupAddress: 'East Mada Street, Mylapore, Chennai - 600004',
    pickupInstructions: 'Collect from dispatch counter near North Gopuram. Pre-packed in foil boxes.',
    donorContact: {
      name: 'Sundaram Gurukkal',
      phone: '+91 98840 76543',
      department: 'Kitchen Committee',
    },
    dietaryTags: ['Pure Vegetarian', 'Leaf-Lined Packs', 'Warm Meals'],
    temperatureStatus: 'Freshly packed; warm in food warmers at 60°C',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    createdAt: Date.now() - 45 * 60 * 1000,
  },
  {
    id: 'food-004',
    title: 'Ghee Pongal & Medu Vadai',
    category: 'Cooked Meals',
    donorName: 'Aachi Grand Banquets',
    donorType: 'Hotel & Banquet Hall',
    isVerifiedDonor: true,
    quantityRemaining: 35,
    initialQuantity: 50,
    unit: 'tiffin sets',
    distanceKm: 0.6,
    expiryTimestamp: Date.now() + (35 * 60) * 1000, // 35m remaining (Urgent)
    pickupWindow: {
      start: '6:30 PM',
      end: '7:30 PM',
    },
    pickupAddress: '142, D.B. Road, RS Puram, Coimbatore - 641002',
    pickupInstructions: 'Banquet front reception desk. Packaged in aluminum carriers with chutney & sambar.',
    donorContact: {
      name: 'Chef Arulmozhi',
      phone: '+91 97900 34567',
      department: 'Catering Lead',
    },
    dietaryTags: ['Vegetarian', 'Crispy Vadai', 'Pure Ghee'],
    temperatureStatus: 'Warm in bain-marie food station at 65°C',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    createdAt: Date.now() - 50 * 60 * 1000,
  },
  {
    id: 'food-005',
    title: 'Veg Puffs & Mysore Pak',
    category: 'Baked Goods',
    donorName: 'Sri Krishna Sweets & Bakery',
    donorType: 'Bakery & Sweet Stall',
    isVerifiedDonor: true,
    quantityRemaining: 40,
    initialQuantity: 50,
    unit: 'boxes',
    distanceKm: 0.9,
    expiryTimestamp: Date.now() + (3 * 3600 + 30 * 60) * 1000, // 3h 30m remaining
    pickupWindow: {
      start: '8:00 PM',
      end: '10:30 PM',
    },
    pickupAddress: '58, Cross Cut Road, Gandhipuram, Coimbatore - 641012',
    pickupInstructions: 'Side dispatch door before closing. Clean assortment boxes with fresh snacks & sweets.',
    donorContact: {
      name: 'V. Ganesan',
      phone: '+91 98430 98765',
      department: 'Store Manager',
    },
    dietaryTags: ['Vegetarian', 'Fresh Baked', 'Ghee Sweets'],
    temperatureStatus: 'Ambient room temperature, baked fresh today',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    createdAt: Date.now() - 60 * 60 * 1000,
  }
];

export const PHOTO_PRESETS = [
  {
    label: 'Chicken Biryani & Raitha',
    category: 'Cooked Meals',
    url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'South Indian Full Meals',
    category: 'Cooked Meals',
    url: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Sambar Rice & Curd Rice',
    category: 'Cooked Meals',
    url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Ghee Pongal & Medu Vadai',
    category: 'Cooked Meals',
    url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Chapati & Veg Kurma',
    category: 'Cooked Meals',
    url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Veg Puffs & Mysore Pak',
    category: 'Baked Goods',
    url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Traditional Sweets Box',
    category: 'Packaged Foods',
    url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
  }
];
