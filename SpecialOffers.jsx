import React from 'react';
import { ArrowRight } from 'lucide-react';

const specialItems = [
  {
    id: 's1',
    name: 'Mediterranean Feast',
    description: 'A complete meal with hummus, falafel, tabbouleh, and fresh pita bread.',
    price: 24.99,
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 's2',
    name: 'Asian Fusion Bowl',
    description: 'Rice bowl with teriyaki chicken, avocado, pickled vegetables, and sesame sauce.',
    price: 18.99,
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 's3',
    name: 'Gourmet Pizza Duo',
    description: 'Two artisanal pizzas with premium toppings and a side of garlic knots.',
    price: 26.99,
    image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 's4',
    name: 'Ultimate Dessert Box',
    description: "Selection of our chef's special desserts including tiramisu, chocolate mousse, and fruit tart.",
    price: 19.99,
    image: 'https://images.pexels.com/photos/1291712/pexels-photo-1291712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

const SpecialOffers = () => {
  return (
    <div className="bg-gradient-to-b from-[#1a1212] to-[#2a1e1e] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent font-dancing">
            Today's <span className="text-stroke-gold">Special</span> Offers
          </h2>
          <p className="text-lg text-amber-200/80 max-w-3xl mx-auto tracking-wide leading-relaxed">
            Savor the extraordinary with our culinary masterpieces crafted to perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialItems.map((item, index) => (
            <div
              key={item.id}
              className="relative group bg-amber-900/20 rounded-2xl overflow-hidden shadow-2xl transform 
                         hover:-translate-y-2 transition-all duration-500 hover:shadow-amber-900/40 border 
                         border-amber-800/30 hover:border-amber-600/50"
              style={{ '--index': index }}
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover brightness-90 group-hover:brightness-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <button className="bg-amber-500 text-amber-900 font-bold px-4 py-2 rounded-full flex items-center text-sm justify-center gap-2 w-full hover:bg-amber-400 transition-colors">
                    View Details <ArrowRight size={16} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-amber-300 font-dancing">{item.name}</h3>
                <p className="text-amber-100/70 text-sm mt-1 mb-3 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-amber-300">${item.price.toFixed(2)}</span>
                  <span className="bg-amber-900/50 text-amber-300 text-xs px-2 py-1 rounded">Limited Time</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
