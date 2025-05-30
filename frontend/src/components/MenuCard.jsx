// frontend/src/components/MenuCard.jsx
import React from 'react';

const MenuCard = ({ item, index }) => {
  return (
    <div 
      className="bg-amber-900/20 rounded-2xl overflow-hidden border border-amber-800/30 backdrop-blur-sm 
                 flex flex-col transition-all duration-500 hover:shadow-lg hover:border-amber-700/50"
      style={{ '--index': index }}
    >
      <div className="relative h-48 sm:h-56 overflow-hidden bg-black/10">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
        />
        <div className="absolute top-0 left-0 px-3 py-1 m-2 bg-amber-600/80 text-amber-100 text-sm font-medium rounded-md">
          {item.type}
        </div>
      </div>
      <div className="p-4 sm:p-6 flex flex-col flex-grow relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-amber-800/50 to-transparent opacity-50" />
        <h3 className="text-xl sm:text-2xl mb-2 font-dancing text-amber-100">
          {item.name}
        </h3>
        <p className="text-amber-100/80 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-amber-100/10 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-lg font-bold text-amber-300 font-dancing">
                Rs.{item.price.toFixed(2)}
              </span>
            </div>
            <span className="text-amber-200 text-sm">
              for {item.sufficientFor} {item.sufficientFor > 1 ? 'persons' : 'person'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
