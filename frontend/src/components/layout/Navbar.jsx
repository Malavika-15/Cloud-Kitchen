import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChefHat, Coffee, Home, Info, Phone, LogIn, LogOut } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', to: '/', icon: Home },
    { name: 'Menu', to: '/menu', icon: Coffee },
    { name: 'About', to: '/about', icon: Info },
    { name: 'Contact', to: '/contact', icon: Phone },
  ];

  return (
    <nav className="bg-gradient-to-r from-amber-900 to-amber-800 border-b-4 border-amber-700 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <ChefHat className="h-8 w-8 md:h-10 md:w-10 text-amber-400 mr-2 transition-transform duration-300 group-hover:rotate-12" />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-dancing text-amber-400 font-bold leading-tight">
                  Cloud Kitchen
                </span>
                <div className="h-[2px] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 w-full mt-0.5"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 flex items-center text-sm rounded-md transition-all duration-300 hover:bg-amber-700/50 ${
                    isActive ? 'bg-amber-700/50 text-amber-300 font-medium' : 'text-amber-100'
                  }`
                }
              >
                <link.icon className="mr-1.5 h-4 w-4" />
                <span>{link.name}</span>
              </NavLink>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `px-3 py-2 flex items-center text-sm rounded-md transition-all duration-300 hover:bg-amber-700/50 ${
                      isActive ? 'bg-amber-700/50 text-amber-300 font-medium' : 'text-amber-100'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <Button
                  variant="outline"
                  size="sm"
                  icon={LogOut}
                  onClick={logout} // This will call your backend logout
                  className="border-amber-400 text-amber-300 hover:bg-amber-800/50"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <NavLink to="/admin/login">
                <Button variant="outline" size="sm" icon={LogIn} className="border-amber-400 text-amber-300 hover:bg-amber-800/50">
                  Admin Login
                </Button>
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-amber-300 hover:text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 p-2 rounded-md"
              aria-expanded={isOpen}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-amber-900 border-t border-amber-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                    isActive ? 'bg-amber-800 text-amber-300' : 'text-amber-100 hover:bg-amber-800/70'
                  }`
                }
              >
                <link.icon className="mr-2 h-5 w-5" />
                {link.name}
              </NavLink>
            ))}

            {isAuthenticated ? (
              <div className="pt-2 space-y-2 border-t border-amber-800/50">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                      isActive ? 'bg-amber-800 text-amber-300' : 'text-amber-100 hover:bg-amber-800/70'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <Button
                  variant="outline"
                  fullWidth
                  icon={LogOut}
                  onClick={logout}
                  className="border-amber-400 text-amber-300 hover:bg-amber-800/50"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="pt-2 border-t border-amber-800/50">
                <NavLink to="/admin/login">
                  <Button variant="outline" fullWidth icon={LogIn} className="border-amber-400 text-amber-300 hover:bg-amber-800/50">
                    Admin Login
                  </Button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
