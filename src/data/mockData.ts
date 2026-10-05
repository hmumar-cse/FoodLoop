import type { FoodItem } from '../types';

export const INITIAL_FOOD_ITEMS: FoodItem[] = [
  {
    id: 'food-001',
    title: 'Kalyana Virundhu Feast: Thalappakatti Style Chicken Biryani, Ennai Kathirikai & Onion Raitha',
    category: 'Cooked Meals',
    donorName: 'Sri Meenakshi Sundareswarar Kalyana Mandapam',
    donorType: 'Kalyana Mandapam (Marriage Hall)',
    isVerifiedDonor: true,
    quantityRemaining: 65,
    initialQuantity: 80,
    unit: 'meals',
    distanceKm: 0.8,
    expiryTimestamp: Date.now() + (1 * 3600 + 15 * 60) * 1000, // 1h 15m remaining (High Amber)
    pickupWindow: {
      start: '2:30 PM',
      end: '4:00 PM',
    },
    pickupAddress: 'No. 45, South Masi Street, Near Meenakshi Temple, Madurai - 625001',
    pickupInstructions: 'Enter through Marriage Hall Kitchen Rear Gate (Pantry dispatch section). Ask for Master Cook Senthil. Please bring stainless steel drums / thermal carrier vessels.',
    donorContact: {
      name: 'M. Senthil Nathan (Head Caterer)',
      phone: '+91 98421 54321',
      department: 'Wedding Catering Operations',
    },
    dietaryTags: ['Halal Chicken', 'Hot & Fresh', 'Nut-Free', 'Authentic Seeraga Samba'],
    temperatureStatus: 'Maintained in sealed commercial stainless-steel hot vessels at 68°C',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    createdAt: Date.now() - 30 * 60 * 1000,
  },
  {
    id: 'food-002',
    title: 'Traditional Tamil Full Meals: Ponni Rice, Arachivitta Murungakkai Sambar, Rasam, Vazhaikkai Poriyal, Kootu & Semiya Payasam',
    category: 'Cooked Meals',
    donorName: 'Sri Krishna Gana Sabha Kalyana Mandapam',
    donorType: 'Kalyana Mandapam (Marriage Hall)',
    isVerifiedDonor: true,
    quantityRemaining: 45,
    initialQuantity: 60,
    unit: 'banana leaf meal sets',
    distanceKm: 1.2,
    expiryTimestamp: Date.now() + (48 * 60) * 1000, // 48m remaining (Urgent Pulsing Red)
    pickupWindow: {
      start: '2:45 PM',
      end: '3:45 PM',
    },
    pickupAddress: '20, Maharajapuram Santhanam Salai, T. Nagar, Chennai - 600017',
    pickupInstructions: 'Report to Dining Hall Basement Service Entrance. Contact Supervisor Ramanathan with your FoodLoop Claim Receipt. Meals are hot in transport containers.',
    donorContact: {
      name: 'K. Ramanathan (Mandapam In-Charge)',
      phone: '+91 94440 12890',
      department: 'Hall Banquet Services',
    },
    dietaryTags: ['Pure Vegetarian', 'Satvik (No Onion/Garlic option)', 'Freshly Prepared'],
    temperatureStatus: 'Steaming hot in insulated thermal insulated cater containers (>65°C)',
    imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
    createdAt: Date.now() - 40 * 60 * 1000,
  },
  {
    id: 'food-003',
    title: 'Temple Annadhanam: Ghee Sambar Sadham, Curd Rice (Thayir Sadham) with Pickle & Crispy Appalam',
    category: 'Cooked Meals',
    donorName: 'Kapaleeshwarar Temple Annadhanam Trust',
    donorType: 'Temple Annadhanam Trust',
    isVerifiedDonor: true,
    quantityRemaining: 80,
    initialQuantity: 100,
    unit: 'meal packets',
    distanceKm: 1.5,
    expiryTimestamp: Date.now() + (2 * 3600 + 45 * 60) * 1000, // 2h 45m remaining (Normal Green)
    pickupWindow: {
      start: '1:30 PM',
      end: '4:30 PM',
    },
    pickupAddress: 'East Mada Street, Kapaleeshwarar Kovil Premises, Mylapore, Chennai - 600004',
    pickupInstructions: 'Collect directly from Annadhanam Prasadam Counter near North Gopuram. Pre-packed in hygienic leaf-lined food grade foil boxes for orphanages and trusts.',
    donorContact: {
      name: 'Sundaram Gurukkal',
      phone: '+91 98840 76543',
      department: 'Trust Annadhanam Committee',
    },
    dietaryTags: ['Pure Vegetarian', 'Temple Prasadam', 'Hygienically Packed'],
    temperatureStatus: 'Freshly packed; warm in food warmers at 60°C',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    createdAt: Date.now() - 45 * 60 * 1000,
  },
  {
    id: 'food-004',
    title: 'Evening Engagement Tiffin: Ghee Ven Pongal, Crispy Medu Vadai, Coconut Chutney & Tiffin Sambar',
    category: 'Cooked Meals',
    donorName: 'Aachi Grand Banquets & Caterers',
    donorType: 'Hotel & Banquet Hall',
    isVerifiedDonor: true,
    quantityRemaining: 35,
    initialQuantity: 50,
    unit: 'tiffin sets',
    distanceKm: 0.6,
    expiryTimestamp: Date.now() + (35 * 60) * 1000, // 35m remaining (Urgent Pulsing Red)
    pickupWindow: {
      start: '6:30 PM',
      end: '7:30 PM',
    },
    pickupAddress: '142, D.B. Road, RS Puram, Coimbatore - 641002',
    pickupInstructions: 'Approach Front Banquet Desk. Inform receptionist Priya that you are collecting FoodLoop surplus rescue. Packaged in aluminum tiffin carriers.',
    donorContact: {
      name: 'Chef Arulmozhi Varman',
      phone: '+91 97900 34567',
      department: 'Catering Head',
    },
    dietaryTags: ['Vegetarian', 'Crispy Vadai', 'Ghee Rich'],
    temperatureStatus: 'Held in commercial bain-marie hot food station at 65°C',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    createdAt: Date.now() - 50 * 60 * 1000,
  },
  {
    id: 'food-005',
    title: 'Evening Fresh Bakery Surplus: Vegetable Puffs, Nei Mysore Pak, Butter Buns & Rava Kesari Boxes',
    category: 'Baked Goods',
    donorName: 'Sri Krishna Sweets & Bakery',
    donorType: 'Bakery & Sweet Stall',
    isVerifiedDonor: true,
    quantityRemaining: 40,
    initialQuantity: 50,
    unit: 'boxes',
    distanceKm: 0.9,
    expiryTimestamp: Date.now() + (3 * 3600 + 30 * 60) * 1000, // 3h 30m remaining (Normal Green)
    pickupWindow: {
      start: '8:00 PM',
      end: '10:30 PM',
    },
    pickupAddress: '58, Cross Cut Road, Gandhipuram, Coimbatore - 641012',
    pickupInstructions: 'Pick up at side dispatch door before shop closing. Boxes are cleanly packed with assortment of fresh puffs and ghee sweets, ideal for children.',
    donorContact: {
      name: 'V. Ganesan (Store Manager)',
      phone: '+91 98430 98765',
      department: 'Evening Dispatch',
    },
    dietaryTags: ['Vegetarian', 'Pure Ghee Sweets', 'Freshly Baked Today'],
    temperatureStatus: 'Ambient bakery room temperature, baked this afternoon at 3:00 PM',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    createdAt: Date.now() - 60 * 60 * 1000,
  }
];

export const PHOTO_PRESETS = [
  {
    label: 'Kalyana Biryani Feast (Seeraga Samba / Basmati)',
    category: 'Cooked Meals',
    url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'South Indian Meals & Sambar Rice',
    category: 'Cooked Meals',
    url: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Temple Annadhanam & Curd Rice Boxes',
    category: 'Cooked Meals',
    url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Ven Pongal, Medu Vadai & Sambar Tiffin',
    category: 'Cooked Meals',
    url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Hot Chapati / Parotta with Veg Kurma',
    category: 'Cooked Meals',
    url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Bakery Vegetable Puffs & Snacks Assortment',
    category: 'Baked Goods',
    url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Traditional Tamil Sweets (Mysore Pak / Kesari)',
    category: 'Packaged Foods',
    url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
  }
];
