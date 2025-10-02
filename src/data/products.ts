import { Product, Category, SubCategory } from '../types/product';
import sprayBoothImage from '../assets/spraybooth.png';

// Sub-categories definitions
export const subCategories: SubCategory[] = [
  // Body Equipment sub-categories
  { id: 'frame-machines', name: 'Frame Machines', parentCategory: 'bodyparts', description: 'Frame straightening equipment' },
  { id: 'welding-equipment', name: 'Welding Equipment', parentCategory: 'bodyparts', description: 'Welding tools and machines' },
  
  
  // Diagnostic Tools sub-categories
  { id: 'alignment-tools', name: 'Alignment Tools', parentCategory: 'diagnostictools', description: 'Wheel alignment equipment' },
  { id: 'testing-equipment', name: 'Testing Equipment', parentCategory: 'diagnostictools', description: 'Diagnostic testing tools' },
  { id: 'pressure-testers', name: 'Pressure Testers', parentCategory: 'diagnostictools', description: 'Pressure testing equipment' },
  
  // Garage Tools sub-categories
  { id: 'lifting-equipment', name: 'Lifting Equipment', parentCategory: 'garagetools', description: 'Jacks, lifts, and hoists' },
  { id: 'air-tools', name: 'Air Tools', parentCategory: 'garagetools', description: 'Pneumatic tools and compressors' },
  { id: 'wheel-service', name: 'Wheel Service', parentCategory: 'garagetools', description: 'Tire and wheel equipment' },
  { id: 'cleaning-equipment', name: 'Cleaning Equipment', parentCategory: 'garagetools', description: 'Washers and cleaning tools' },
  { id: 'ac-service', name: 'AC Service', parentCategory: 'garagetools', description: 'Air conditioning service equipment' },
  { id: 'lubebay', name: 'Lube Bay', parentCategory: 'garagetools', description: 'lube and all' },
  
  // Diagnostic Scanners sub-categories
  { id: 'konwei', name: 'Konwei', parentCategory: 'diagnosticscanners', description: 'Konwei Scanners' },
  { id: 'thinkcar', name: 'Thinkcar', parentCategory: 'diagnosticscanners', description: 'Thinkcar scanners' },
  { id: 'xtool', name: 'XTOOL', parentCategory: 'diagnosticscanners', description: 'XTOOL scanners' },
  { id: 'thinkdiag', name: 'Thinkdiag', parentCategory: 'diagnosticscanners', description: 'Thinkdiag scanners' },
  
  // Hand Tools sub-categories
  { id: 'socket-sets', name: 'Socket Sets', parentCategory: 'handtools', description: 'Socket and ratchet sets' },
  { id: 'pneumatic-tools', name: 'Pneumatic Tools', parentCategory: 'handtools', description: 'Air-powered hand tools' },
  { id: 'specialty-tools', name: 'Specialty Tools', parentCategory: 'handtools', description: 'Specialized automotive tools' },
  
];

// Enhanced categories with sub-categories
export const categories: Category[] = [
  {
    id: 'spraybooth',
    name: 'SprayBooth',
    description: 'Premium car oven',
    icon: '🔥',
    subCategories: subCategories.filter(sub => sub.parentCategory === 'spraybooth')
  },
  {
    id: 'bodyparts',
    name: 'Body Equipment',
    description: 'Premium body equipment',
    icon: '🛡️',
    subCategories: subCategories.filter(sub => sub.parentCategory === 'bodyparts')
  },
  {
    id: 'diagnostictools',
    name: 'Diagnostic Tools',
    description: 'Quality diagnostic tools and accessories',
    icon: '⚙️',
    subCategories: subCategories.filter(sub => sub.parentCategory === 'diagnostictools')
  },
  {
    id: 'garagetools',
    name: 'Garage Tools',
    description: 'Premium garage tools and accessories',
    icon: '🔧',
    subCategories: subCategories.filter(sub => sub.parentCategory === 'garagetools')
  },
  {
    id: 'diagnosticscanners',
    name: 'Diagnostic Scanners',
    description: 'Diagnostic scanners optimal performance',
    icon: '💻',
    subCategories: subCategories.filter(sub => sub.parentCategory === 'diagnosticscanners')
  },
  {
    id: 'accessories',
    name: 'Our Brand',
    description: 'Get premium tools made by us',
    icon: '✨',
  },
  {
    id: 'handtools',
    name: 'Hand Tools',
    description: 'Quality garage hand tools',
    icon: '🖐️',
    subCategories: subCategories.filter(sub => sub.parentCategory === 'handtools')
  },
];

// Helper functions
export const getSubCategoriesByParent = (parentCategoryId: string): SubCategory[] => {
  return subCategories.filter(sub => sub.parentCategory === parentCategoryId);
};

export const getCategoryWithSubCategories = (categoryId: string): Category | undefined => {
  return categories.find(cat => cat.id === categoryId);
};

// Updated products with sub-categories
export const products: Product[] = [
  {
    id: 'spraybooth',
    name: 'Garutech Spray Booth',
    price: 27000000,
    originalPrice: null,
    image: sprayBoothImage,
    category: ['spraybooth', 'bodyparts'],
    subCategory: ['paint-booths', 'LUB'], // Added sub-category
    brand: 'Garutech',
    description: 'Semi-Down Draft: Air enter booth cabin through top front filtered plenum, and exhausted from the rear centered exhaust plenum',
    specifications: {
      'Wall panel': 'sandwich style, δ=50mm, polystyrene. rock wool is optional.',
      'Basement': 'steel structure, 3 rows of vein board and 2 rows of grids, full grids as optiona',
      'Door': ' 3 pcs of front door without aluminum side cover. 1pcs of emergency door with pressure lock',
      'Ramp': '2 pcs of vein board.-One 7.5kw intake fan',
      'Control box:': 'components made in china, overload, overheat,phase-lacking protection, straight driven motor.',
      'Heat exchanger':' stainless steel. Riello G20 burner',
      'Roof filter' : '4 pcs of filter, mounted above support frame, which is made of steel and powder coated',
    },
    inStock: true,
    stockCount: 20,
    rating: 4.8,
    reviews: 156,
    features: [
      'Spraying/baking transition damper, automatically air controlled',
      'Automatically stop when preset time is up.—Constant temperature spraying',
      'Quiet operation',
      'Extended lifespan',
      'Fade resistant',
    ],
  },
];

export const featuredProducts = products.slice(0, 3);
export const relatedProducts = (currentProductId: string) => 
  products.filter(p => p.id !== currentProductId).slice(0, 4);