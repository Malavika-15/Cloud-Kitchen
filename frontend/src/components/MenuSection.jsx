import React, { useState } from 'react';
import { useMenu } from '../context/MenuContext';
import MenuCard from './MenuCard';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import { ExternalLink } from 'lucide-react';

const MenuSection = () => {
  const { menuItems } = useMenu();
  const [activeType, setActiveType] = useState('Breakfast');

  const today = new Date().toISOString().split('T')[0];
  const todayItems = Array.isArray(menuItems) 
  ? menuItems.filter(item => item.date === today && item.type === activeType)
  : [];

  const typeButtons = [
    { type: 'Breakfast', label: 'Breakfast' },
    { type: 'Lunch', label: 'Lunch' },
    { type: 'Dinner', label: 'Dinner' }
  ];

  return (
    <div className="bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl font-dancing text-amber-400 mb-4">Today's Menu</h2>
          <p className="text-lg text-amber-100/80 max-w-2xl mx-auto">
            Explore our freshly prepared dishes crafted with love and expertise.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {typeButtons.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-6 py-2 rounded-full border-2 transition-all duration-300 text-lg tracking-wide
                ${
                  activeType === type
                    ? 'bg-gradient-to-r from-amber-900/80 to-amber-700/80 border-amber-800 scale-105 shadow-lg shadow-amber-900/30 text-amber-300 font-medium'
                    : 'bg-amber-900/20 border-amber-800/30 text-amber-100/80 hover:scale-95 hover:bg-amber-800/40'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="menu-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {todayItems.length > 0 ? (
            todayItems.map((item, index) => (
              <MenuCard key={item.id} item={item} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-amber-300">No {activeType.toLowerCase()} items available for today.</p>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Link to="/menu">
            <Button variant="outline" icon={ExternalLink} iconPosition="right" className="border-amber-600">
              View Full Menu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
