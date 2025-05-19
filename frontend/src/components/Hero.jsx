// frontend/src/components/Hero.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChefHat, Utensils, Clock } from 'lucide-react';
import Button from './ui/Button';

const bannerImage = 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
const orbitImages = [
  'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1305063/pexels-photo-1305063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
];

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
    setSearchQuery('');
  };

  return (
    <div className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 text-white py-16 px-4 sm:px-8">
      <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        {/* Left Content */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight font-serif drop-shadow-md">
            Welcome to
            <br />
            <span className="flex items-center justify-center md:justify-start gap-2 text-amber-300 mt-2 font-dancing">
              Cloud Kitchen
              <ChefHat className="text-amber-300 h-8 w-8 sm:h-10 sm:w-10 animate-float" />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-amber-100 max-w-xl opacity-90">
            Internal Dashboard for Kitchen Staff 🍴 — Manage meals, check inventory, and monitor operations efficiently.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto md:mx-0 group">
            <div className="relative flex items-center bg-amber-900/30 rounded-xl border-2 border-amber-500/30 shadow-2xl hover:border-amber-400/50 transition-all duration-300">
              <div className="pl-6 pr-3 py-4">
                <Search className="text-amber-400/80" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for items, tasks..."
                className="w-full py-4 pr-6 bg-transparent outline-none placeholder-amber-200/70 text-lg font-medium tracking-wide"
              />
              <Button
                type="submit"
                variant="primary"
                className="mr-4"
              >
                Search
              </Button>
            </div>
          </form>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="bg-amber-900/50 p-4 rounded-lg border border-amber-600/30 flex items-center gap-3">
              <Utensils className="text-amber-400 h-6 w-6" />
              <div>
                <h3 className="font-semibold text-amber-200">Quality Food</h3>
                <p className="text-xs text-amber-100/70">Fresh ingredients daily</p>
              </div>
            </div>
            <div className="bg-amber-900/50 p-4 rounded-lg border border-amber-600/30 flex items-center gap-3">
              <Clock className="text-amber-400 h-6 w-6" />
              <div>
                <h3 className="font-semibold text-amber-200">24/7 Service</h3>
                <p className="text-xs text-amber-100/70">Kitchen always open</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Images */}
        <div className="flex-1 relative min-h-[300px] sm:min-h-[400px]">
          {/* Main image */}
          <div className="relative rounded-full p-1 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-400 shadow-2xl z-20 w-[200px] xs:w-[250px] sm:w-[300px] h-[200px] xs:h-[250px] sm:h-[300px] mx-auto">
            <img
              src={bannerImage}
              alt="Chef"
              className="rounded-full border-4 xs:border-8 border-amber-900/50 w-full h-full object-cover"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-amber-900/40 mix-blend-multiply" />
          </div>

          {/* Orbit Images */}
          {orbitImages.map((img, index) => (
            <div
              key={index}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
                index === 0 ? 'orbit' : `orbit-delay-${index * 5}`
              } w-[100px] xs:w-[120px] sm:w-[140px] h-[100px] xs:h-[120px] sm:h-[140px]`}
            >
              <img
                src={img}
                alt={`Orbiting ${index + 1}`}
                className="w-full h-full rounded-full border border-amber-500/30 shadow-lg bg-amber-900/20 p-1 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
