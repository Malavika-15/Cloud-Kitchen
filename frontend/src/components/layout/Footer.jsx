import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChefHat,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';
import axios from 'axios';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/newsletter', { email });
      alert('Subscribed successfully!');
      setEmail('');
    } catch (err) {
      alert('Subscription failed!');
    }
  };

  return (
    <footer className="bg-gradient-to-br from-amber-900 via-amber-950 to-amber-900 text-amber-100">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center mb-4">
              <ChefHat className="h-8 w-8 text-amber-400 mr-2" />
              <h3 className="text-2xl font-dancing text-amber-400">Cloud Kitchen</h3>
            </div>
            <p className="text-amber-200/80 mb-4 text-sm">
              Behind every great meal is a team that makes it happen. Our cloud kitchen delivers exceptional culinary experiences made with love and expertise.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-400 hover:text-amber-300 transition-colors p-2 bg-amber-900/50 rounded-full">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-amber-400 hover:text-amber-300 transition-colors p-2 bg-amber-900/50 rounded-full">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-amber-400 hover:text-amber-300 transition-colors p-2 bg-amber-900/50 rounded-full">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-l-4 border-amber-500 pl-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-amber-200 hover:text-amber-400 transition-colors flex items-center">
                  <span className="mr-2">›</span>Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-amber-200 hover:text-amber-400 transition-colors flex items-center">
                  <span className="mr-2">›</span>Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-amber-200 hover:text-amber-400 transition-colors flex items-center">
                  <span className="mr-2">›</span>About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-amber-200 hover:text-amber-400 transition-colors flex items-center">
                  <span className="mr-2">›</span>Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-l-4 border-amber-500 pl-3">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-amber-200">TamilNadu, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-amber-400 mr-2 flex-shrink-0" />
                <span className="text-amber-200">+91 9478255685</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-amber-400 mr-2 flex-shrink-0" />
                <span className="text-amber-200">info@cloudkitchen.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-l-4 border-amber-500 pl-3">Subscribe</h3>
            <p className="text-amber-200/80 mb-4 text-sm">
              Stay updated with our latest menus and special offers.
            </p>
            <form className="space-y-2" onSubmit={handleSubscribe}>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="px-3 py-2 w-full bg-amber-900/30 border border-amber-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-100 placeholder-amber-400/70"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-r-md hover:from-amber-600 hover:to-amber-700 transition-colors"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-amber-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-amber-300/70">
          <p>© {currentYear} Cloud Kitchen. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link to="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
