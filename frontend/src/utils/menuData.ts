export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner';
  date: string;
  quantity: number;
  sufficientFor: number;
}

// Helper function to generate a random ID
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Sample breakfast items
const breakfastItems: MenuItem[] = [
  {
    id: 'b1',
    name: 'Avocado Toast',
    description: 'Freshly mashed avocado on artisan bread, with cherry tomatoes and microgreens',
    price: 250,
    image: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Breakfast',
    date: new Date().toISOString().split('T')[0],
    quantity: 1,
    sufficientFor: 1
  },
  {
    id: 'b2',
    name: 'Breakfast Burrito',
    description: 'Scrambled eggs, black beans, cheese, and salsa wrapped in a warm tortilla',
    price: 850,
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Breakfast',
    date: new Date().toISOString().split('T')[0],
    quantity: 1,
    sufficientFor: 1
  },
  {
    id: 'b3',
    name: 'Greek Yogurt Bowl',
    description: 'Creamy yogurt topped with fresh berries, honey, and house-made granola',
    price: 100,
    image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Breakfast',
    date: new Date().toISOString().split('T')[0],
    quantity: 1,
    sufficientFor: 1
  },
  {
    id: 'b4',
    name: 'Eggs Benedict',
    description: 'Poached eggs on English muffin with hollandaise sauce and Canadian bacon',
    price: 120,
    image: 'https://images.pexels.com/photos/139746/pexels-photo-139746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Breakfast',
    date: new Date().toISOString().split('T')[0],
    quantity: 1,
    sufficientFor: 1
  }
];

// Sample lunch items
const lunchItems: MenuItem[] = [
  {
    id: 'l1',
    name: 'Mediterranean Salad',
    description: 'Fresh greens with feta, olives, cucumbers, and house vinaigrette',
    price: 450,
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Lunch',
    date: new Date().toISOString().split('T')[0],
    quantity: 1,
    sufficientFor: 1
  },
  {
    id: 'l2',
    name: 'Grilled Chicken Sandwich',
    description: 'Herb-marinated chicken with avocado, bacon, and aioli on ciabatta',
    price: 480,
    image: 'https://images.pexels.com/photos/1633572/pexels-photo-1633572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Lunch',
    date: new Date().toISOString().split('T')[0],
    quantity: 1,
    sufficientFor: 1
  },
  {
    id: 'l3',
    name: 'Quinoa Bowl',
    description: 'Protein-rich quinoa with roasted vegetables, chickpeas, and tahini sauce',
    price: 500,
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Lunch',
    date: new Date().toISOString().split('T')[0],
    quantity: 1,
    sufficientFor: 1
  },
  {
    id: 'l4',
    name: 'Spicy Tuna Wrap',
    description: 'Sushi-grade tuna with mixed greens, avocado, and spicy mayo in a spinach wrap',
    price: 560,
    image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Lunch',
    date: new Date().toISOString().split('T')[0],
    quantity: 1,
    sufficientFor: 1
  }
];

// Sample dinner items
const dinnerItems: MenuItem[] = [
  {
    id: 'd1',
    name: 'Pan-Seared Salmon',
    description: 'Wild-caught salmon with lemon butter sauce, asparagus, and herb-roasted potatoes',
    price: 250,
    image: 'https://images.pexels.com/photos/239475/pexels-photo-239475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Dinner',
    date: new Date().toISOString().split('T')[0],
    quantity: 1,
    sufficientFor: 2
  },
  {
    id: 'd2',
    name: 'Beef Tenderloin',
    description: 'Grass-fed beef medallions with port wine reduction, mushroom risotto, and seasonal vegetables',
    price: 750,
    image: 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Dinner',
    date: new Date().toISOString().split('T')[0],
    quantity: 1,
    sufficientFor: 2
  },
  {
    id: 'd3',
    name: 'Vegetable Curry',
    description: 'Aromatic curry with seasonal vegetables, served with basmati rice and naan bread',
    price: 500,
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Dinner',
    date: new Date().toISOString().split('T')[0],
    quantity: 1,
    sufficientFor: 2
  },
  {
    id: 'd4',
    name: 'Eggplant Parmesan',
    description: 'Layers of breaded eggplant, marinara sauce, and melted cheese, served with pasta',
    price: 180,
    image: 'https://images.pexels.com/photos/64208/pexels-photo-64208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Dinner',
    date: new Date().toISOString().split('T')[0],
    quantity: 1,
    sufficientFor: 2
  }
];

// Create menu data for the coming days
export const createUpcomingMenus = () => {
  const today = new Date();
  const upcomingDays: MenuItem[] = [];

  for (let i = 1; i <= 6; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    const dateString = nextDay.toISOString().split('T')[0];

    // Add one item of each type for the upcoming day
    upcomingDays.push(
      {
        ...breakfastItems[i % breakfastItems.length],
        id: generateId(),
        date: dateString
      },
      {
        ...lunchItems[i % lunchItems.length],
        id: generateId(),
        date: dateString
      },
      {
        ...dinnerItems[i % dinnerItems.length],
        id: generateId(),
        date: dateString
      }
    );
  }

  return upcomingDays;
};

// Combine all menu items
export const initialMenuItems: MenuItem[] = [
  ...breakfastItems,
  ...lunchItems,
  ...dinnerItems,
  ...createUpcomingMenus()
];

// Get menu items for a specific date
export const getMenuItemsByDate = (items: MenuItem[], date: string) => {
  return items.filter(item => item.date === date);
};

// Get menu items for today
export const getTodayMenuItems = (items: MenuItem[]) => {
  const today = new Date().toISOString().split('T')[0];
  return getMenuItemsByDate(items, today);
};

// Get menu items by type
export const getMenuItemsByType = (items: MenuItem[], type: 'Breakfast' | 'Lunch' | 'Dinner') => {
  return items.filter(item => item.type === type);
};