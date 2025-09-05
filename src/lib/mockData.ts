// Mock data for EcoDrop waste management app

export interface WasteCategory {
  id: string;
  name: string;
  unit: 'kg' | 'count';
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
  totalPoints?: number;
}

export const wasteCategories: WasteCategory[] = [
  {
    id: 'plastic',
    name: 'Plastic Bottles',
    unit: 'kg',
    pointsPerUnit: 10,
    icon: '🍶',
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'paper',
    name: 'Paper & Cardboard',
    unit: 'kg',
    pointsPerUnit: 8,
    icon: '📄',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'glass',
    name: 'Glass Containers',
    unit: 'kg',
    pointsPerUnit: 12,
    icon: '🫙',
    color: 'from-emerald-400 to-green-600'
  },
  {
    id: 'metal',
    name: 'Metal Cans',
    unit: 'kg',
    pointsPerUnit: 18,
    icon: '🥫',
    color: 'from-gray-400 to-slate-600'
  },
  {
    id: 'ewaste',
    name: 'Electronics',
    unit: 'count',
    pointsPerUnit: 50,
    icon: '📱',
    color: 'from-purple-400 to-indigo-600'
  },
  {
    id: 'books',
    name: 'Books & Magazines',
    unit: 'kg',
    pointsPerUnit: 9,
    icon: '📚',
    color: 'from-red-400 to-rose-600'
  }
];

export const binStations: BinStation[] = [
  {
    id: 'station-1',
    name: 'Manipal University Jaipur Campus',
    address: 'Dehmi Kalan, Near GVK Toll Plaza, Jaipur-Delhi Highway, Jaipur, Rajasthan 303007',
    lat: 26.9124,
    lng: 75.7873,
    isActive: true,
    hours: '6:00 AM - 8:00 PM',
    supportedCategories: ['plastic', 'paper', 'glass', 'metal'],
    distance: 0.2
  },
  {
    id: 'station-2',
    name: 'Jaipur City Recycling Hub',
    address: 'C-Scheme, Near Central Park, Jaipur, Rajasthan 302001',
    lat: 26.9220,
    lng: 75.7785,
    isActive: true,
    hours: '24/7',
    supportedCategories: ['plastic', 'paper', 'glass', 'metal', 'ewaste', 'books'],
    distance: 1.8
  },
  {
    id: 'station-3',
    name: 'Bagru Industrial Area Station',
    address: 'Bagru Industrial Area, Near RIICO Office, Jaipur, Rajasthan 303007',
    lat: 26.9056,
    lng: 75.8123,
    isActive: true,
    hours: '7:00 AM - 6:00 PM',
    supportedCategories: ['plastic', 'paper', 'glass'],
    distance: 2.5
  },
  {
    id: 'station-4',
    name: 'IT Park E-Waste Center',
    address: 'Mahindra World City, Near Sitapura Industrial Area, Jaipur, Rajasthan 302022',
    lat: 26.8500,
    lng: 75.8000,
    isActive: true,
    hours: '9:00 AM - 7:00 PM',
    supportedCategories: ['ewaste', 'metal'],
    distance: 4.2
  }
];

export const rewards: Reward[] = [
  {
    id: 'reward-1',
    name: 'Nescafe Campus ',
    description: 'Free medium coffee at participating cafes',
    pointsCost: 150,
    stock: 45,
    vendor: 'Nescafe',
    image: '☕'
  },
  {
    id: 'reward-2',
    name: 'Slice of Heaven Meal for 1 Coupon',
    description: 'Discount on Meal for 1 coupon',
    pointsCost: 500,
    stock: 20,
    vendor: 'slice of heaven',
    image: '🍔'
  },
  {
    id: 'reward-3',
    name: 'Public Transport Pass',
    description: 'Free day pass for Jaipur city buses and metro',
    pointsCost: 300,
    stock: 35,
    vendor: 'Jaipur City Transport',
    image: '🚌'
  },
  {
    id: 'reward-4',
    name: 'Manipal University Jaipur Merchandise ',
    description: 'Tshirt, Pen, Diary and more ',
    pointsCost: 750,
    stock: 12,
    vendor: 'Manipal Merchandise',
    image: '🎁'
  },
  {
    id: 'reward-5',
    name: 'Movie Theater Tickets',
    description: '2 tickets to any showing at PVR Cinemas',
    pointsCost: 600,
    stock: 18,
    vendor: 'PVR Cinemas',
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
    totalPoints: 57
  },
  {
    id: 'drop-2',
    stationName: 'Jaipur City Recycling Hub',
    scheduledAt: new Date('2024-01-20T10:00:00'),
    items: [
      { categoryId: 'ewaste', categoryName: 'Electronics', declaredQty: 1, unit: 'count' }
    ],
    status: 'CHECKED_IN',
    totalPoints: 50
  },
  {
    id: 'drop-3',
    stationName: 'Manipal University Jaipur Campus',
    scheduledAt: new Date('2024-01-25T16:00:00'),
    items: [
      { categoryId: 'glass', categoryName: 'Glass Containers', declaredQty: 1.8, unit: 'kg' }
    ],
    status: 'PENDING'
  }
];

export const userProfile = {
  name: 'Aarav Parikh',
  email: 'aarav.parikh@example.com',
  pointsBalance: 847,
  totalDropoffs: 12,
  totalPointsEarned: 1250,
  totalWasteRecycled: 45.6, // kg
  joinedDate: new Date('2023-11-01'),
  locality: 'Bagru',
  address: 'Manipal University Jaipur'
};