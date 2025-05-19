import React, { useState } from 'react';
import { useMenu } from '../context/MenuContext';
import MenuCard from '../components/MenuCard';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Calendar, Filter } from 'lucide-react';

const MenuPage = () => {
  const { menuItems } = useMenu();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const dates = Array.from(new Set(menuItems.map(item => item.date))).sort();

  const filteredItems = menuItems.filter(item => {
    if (selectedDate && item.date !== selectedDate) return false;
    if (selectedType && item.type !== selectedType) return false;
    return true;
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-dancing text-amber-400 mb-4">Our Menu</h1>
            <p className="text-lg text-amber-100/80 max-w-2xl mx-auto">
              Explore our diverse selection of dishes, crafted with care and premium ingredients.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-amber-900/30 p-6 rounded-xl border border-amber-800/50 mb-10">
            <h2 className="text-xl font-medium text-amber-300 mb-4 flex items-center">
              <Filter className="mr-2 h-5 w-5" /> Filter Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Filter */}
              <div>
                <label className="block text-amber-200 text-sm font-medium mb-2 flex items-center">
                  <Calendar className="mr-2 h-4 w-4" /> Select Date
                </label>
                <select
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="w-full bg-amber-950/50 border border-amber-700 rounded-md px-4 py-2 text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {dates.map(date => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-amber-200 text-sm font-medium mb-2">Meal Type</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedType(null)}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      selectedType === null
                        ? 'bg-amber-600 border-amber-500 text-white'
                        : 'bg-transparent border-amber-700 text-amber-300 hover:bg-amber-800/50'
                    }`}
                  >
                    All
                  </button>
                  {['Breakfast', 'Lunch', 'Dinner'].map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1 rounded-full text-sm border ${
                        selectedType === type
                          ? 'bg-amber-600 border-amber-500 text-white'
                          : 'bg-transparent border-amber-700 text-amber-300 hover:bg-amber-800/50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="menu-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <MenuCard key={item.id} item={item} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-amber-900/20 rounded-xl border border-amber-800/50">
                <p className="text-xl text-amber-300">No menu items available for the selected criteria.</p>
                <p className="text-amber-200/70 mt-2">Try changing your filters or check back later.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MenuPage;
