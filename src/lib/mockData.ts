// Mock data for EcoDrop waste management app

export interface WasteCategory {
  id: string;
  name: string;
  unit: 'kg' | 'count';
  baseRatePerUnit: number;
  pointsPerUnit: number;
  icon: string;
  color: string;
}

export interface BinStation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  isActive: boolean;
  hours: string;
  supportedCategories: string[];
  distance?: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  stock: number;
  vendor: string;
  image: string;
}

export interface DropoffSchedule {
  id: string;
  stationName: string;
  scheduledAt: Date;
  items: Array<{
    categoryId: string;
    categoryName: string;
    declaredQty: number;
    unit: string;
  }>;
  status: 'PENDING' | 'CHECKED_IN' | 'CANCELLED';
  qrCode: string;
  totalPoints?: number;
  totalPrice?: number;
}

export const wasteCategories: WasteCategory[] = [
  {
    id: 'plastic',
    name: 'Plastic Bottles',
    unit: 'kg',
    baseRatePerUnit: 2.5,
    pointsPerUnit: 10,
    icon: '🍶',
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'paper',
    name: 'Paper & Cardboard',
    unit: 'kg',
    baseRatePerUnit: 1.8,
    pointsPerUnit: 8,
    icon: '📄',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'glass',
    name: 'Glass Containers',
    unit: 'kg',
    baseRatePerUnit: 3.2,
    pointsPerUnit: 12,
    icon: '🫙',
    color: 'from-emerald-400 to-green-600'
  },
  {
    id: 'metal',
    name: 'Metal Cans',
    unit: 'kg',
    baseRatePerUnit: 4.5,
    pointsPerUnit: 18,
    icon: '🥫',
    color: 'from-gray-400 to-slate-600'
  },
  {
    id: 'ewaste',
    name: 'Electronics',
    unit: 'count',
    baseRatePerUnit: 15.0,
    pointsPerUnit: 50,
    icon: '📱',
    color: 'from-purple-400 to-indigo-600'
  },
  {
    id: 'books',
    name: 'Books & Magazines',
    unit: 'kg',
    baseRatePerUnit: 2.0,
    pointsPerUnit: 9,
    icon: '📚',
    color: 'from-red-400 to-rose-600'
  }
];

export const binStations: BinStation[] = [
  {
    id: 'station-1',
    name: 'Green Valley Community Center',
    address: '123 Eco Street, Green Valley',
    lat: 37.7749,
    lng: -122.4194,
    isActive: true,
    hours: '6:00 AM - 8:00 PM',
    supportedCategories: ['plastic', 'paper', 'glass', 'metal'],
    distance: 0.8
  },
  {
    id: 'station-2',
    name: 'Downtown Recycling Hub',
    address: '456 Main Street, Downtown',
    lat: 37.7849,
    lng: -122.4094,
    isActive: true,
    hours: '24/7',
    supportedCategories: ['plastic', 'paper', 'glass', 'metal', 'ewaste', 'books'],
    distance: 1.2
  },
  {
    id: 'station-3',
    name: 'Riverside Park Station',
    address: '789 River Road, Riverside',
    lat: 37.7649,
    lng: -122.4294,
    isActive: true,
    hours: '7:00 AM - 6:00 PM',
    supportedCategories: ['plastic', 'paper', 'glass'],
    distance: 2.1
  },
  {
    id: 'station-4',
    name: 'Tech District E-Waste Center',
    address: '321 Innovation Ave, Tech District',
    lat: 37.7949,
    lng: -122.3994,
    isActive: true,
    hours: '9:00 AM - 7:00 PM',
    supportedCategories: ['ewaste', 'metal'],
    distance: 3.5
  }
];

export const rewards: Reward[] = [
  {
    id: 'reward-1',
    name: 'Coffee Shop Voucher',
    description: 'Free medium coffee at participating cafes',
    pointsCost: 150,
    stock: 45,
    vendor: 'Green Bean Coffee',
    image: '☕'
  },
  {
    id: 'reward-2',
    name: 'Grocery Store Coupon',
    description: '$10 off your next grocery purchase',
    pointsCost: 500,
    stock: 20,
    vendor: 'Eco Mart',
    image: '🛒'
  },
  {
    id: 'reward-3',
    name: 'Public Transport Pass',
    description: 'Free day pass for local buses and trains',
    pointsCost: 300,
    stock: 35,
    vendor: 'Metro Transit',
    image: '🚌'
  },
  {
    id: 'reward-4',
    name: 'Eco-Friendly Products Pack',
    description: 'Reusable bags, bamboo utensils, and more',
    pointsCost: 750,
    stock: 12,
    vendor: 'EcoLife Store',
    image: '🌱'
  },
  {
    id: 'reward-5',
    name: 'Movie Theater Tickets',
    description: '2 tickets to any showing at participating theaters',
    pointsCost: 600,
    stock: 18,
    vendor: 'CinemaMax',
    image: '🎬'
  }
];

export const userHistory: DropoffSchedule[] = [
  {
    id: 'drop-1',
    stationName: 'Green Valley Community Center',
    scheduledAt: new Date('2024-01-15T14:30:00'),
    items: [
      { categoryId: 'plastic', categoryName: 'Plastic Bottles', declaredQty: 2.5, unit: 'kg' },
      { categoryId: 'paper', categoryName: 'Paper & Cardboard', declaredQty: 4.0, unit: 'kg' }
    ],
    status: 'CHECKED_IN',
    qrCode: 'QR123456789',
    totalPoints: 57,
    totalPrice: 13.45
  },
  {
    id: 'drop-2',
    stationName: 'Downtown Recycling Hub',
    scheduledAt: new Date('2024-01-20T10:00:00'),
    items: [
      { categoryId: 'ewaste', categoryName: 'Electronics', declaredQty: 1, unit: 'count' }
    ],
    status: 'CHECKED_IN',
    qrCode: 'QR987654321',
    totalPoints: 50,
    totalPrice: 15.0
  },
  {
    id: 'drop-3',
    stationName: 'Green Valley Community Center',
    scheduledAt: new Date('2024-01-25T16:00:00'),
    items: [
      { categoryId: 'glass', categoryName: 'Glass Containers', declaredQty: 1.8, unit: 'kg' }
    ],
    status: 'PENDING',
    qrCode: 'QR456789123'
  }
];

export const userProfile = {
  name: 'Alex Chen',
  email: 'alex.chen@example.com',
  pointsBalance: 847,
  totalDropoffs: 12,
  totalPointsEarned: 1250,
  totalWasteRecycled: 45.6, // kg
  joinedDate: new Date('2023-11-01'),
  locality: 'Green Valley District',
  address: '789 Maple Street, Green Valley'
};