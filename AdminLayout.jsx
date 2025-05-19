import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChefHat, Menu, X, Home, LayoutDashboard, LogOut, PlusCircle, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      navigate('/admin/login');
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Add Menu', href: '/admin/add-menu', icon: PlusCircle },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-amber-950 via-amber-900 to-amber-950">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 flex z-40 md:hidden transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gradient-to-b from-amber-900 to-amber-950 shadow-xl">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-amber-300" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <ChefHat className="h-8 w-8 text-amber-400 mr-2" />
              <span className="text-2xl font-bold text-amber-400">Cloud Kitchen</span>
            </div>
            <nav className="mt-8 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                    isActive(item.href) ? 'bg-amber-800 text-amber-200' : 'text-amber-300 hover:bg-amber-800/50'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive(item.href) ? 'text-amber-300' : 'text-amber-400 group-hover:text-amber-300'
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
              <Link
                to="/"
                className="group flex items-center px-4 py-3 text-sm font-medium rounded-md text-amber-300 hover:bg-amber-800/50"
                onClick={() => setSidebarOpen(false)}
              >
                <Home className="mr-3 h-5 w-5 text-amber-400 group-hover:text-amber-300" />
                Go to Website
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-amber-800 p-4">
            <button onClick={handleLogout} className="flex-shrink-0 group block w-full flex items-center">
              <div className="ml-3">
                <p className="text-base font-medium text-amber-300 group-hover:text-amber-200 flex items-center">
                  <LogOut className="mr-2 h-5 w-5" /> Log out
                </p>
              </div>
            </button>
          </div>
        </div>
        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-gradient-to-b from-amber-900 to-amber-950 shadow-lg">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4 mb-6">
                <ChefHat className="h-8 w-8 text-amber-400 mr-2" />
                <span className="text-2xl text-amber-400 font-bold">Cloud Kitchen</span>
              </div>
              <nav className="mt-4 flex-1 px-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive(item.href) ? 'bg-amber-800 text-amber-200' : 'text-amber-300 hover:bg-amber-800/50'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        isActive(item.href) ? 'text-amber-300' : 'text-amber-400 group-hover:text-amber-300'
                      }`}
                    />
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 pb-3 border-t border-amber-800/50">
                  <Link
                    to="/"
                    className="group flex items-center px-4 py-3 text-sm font-medium rounded-md text-amber-300 hover:bg-amber-800/50"
                  >
                    <Home className="mr-3 h-5 w-5 text-amber-400 group-hover:text-amber-300" />
                    Go to Website
                  </Link>
                </div>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-amber-800 p-4">
              <button onClick={handleLogout} className="flex-shrink-0 w-full group flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-amber-300 group-hover:text-amber-200 flex items-center">
                    <LogOut className="mr-2 h-5 w-5" /> Log out
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gradient-to-r from-amber-900 to-amber-800 shadow-md">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-amber-300 hover:text-amber-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
