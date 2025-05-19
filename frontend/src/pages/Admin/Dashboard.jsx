import React, { useState } from 'react';
import { useMenu } from '../../context/MenuContext';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import Button from '../../components/ui/Button';
import { Plus, Calendar, Trash2, Edit, Filter } from 'lucide-react';

const Dashboard = () => {
  const { menuItems, deleteMenuItem } = useMenu();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [filterDate, setFilterDate] = useState('');
  const [filterType, setFilterType] = useState('');

  const successMessage = location.state?.success;

  // Get unique dates from menu items
  const uniqueDates = Array.from(new Set(menuItems.map(item => item.date))).sort();

  // Filter menu items based on selected date and type
  const filteredMenuItems = menuItems.filter(item => {
    if (filterDate && item.date !== filterDate) return false;
    if (filterType && item.type !== filterType) return false;
    return true;
  });

  // Group menu items by date and type
  const groupedMenuItems = {};

  filteredMenuItems.forEach(item => {
    const key = `${item.date}-${item.type}`;
    if (!groupedMenuItems[key]) {
      groupedMenuItems[key] = [];
    }
    groupedMenuItems[key].push(item);
  });

  // Handle menu item deletion with confirmation
  const handleDeleteMenuItem = (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      deleteMenuItem(id);
    }
  };

  return (
    <AdminLayout>
      <div className="pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-amber-300">Menu Dashboard</h1>
            <p className="text-amber-200/70 mt-1">Manage and organize your kitchen menu</p>
          </div>
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => navigate('/admin/add-menu')}
            className="mt-4 sm:mt-0"
          >
            Add New Menu Item
          </Button>
        </div>

        {successMessage && (
          <div className="bg-green-600/20 border border-green-500/50 text-green-300 px-4 py-3 rounded mb-6">
            {successMessage}
          </div>
        )}

        {/* Filters */}
        <div className="bg-amber-900/30 rounded-lg border border-amber-800/50 p-6 mb-8">
          <h2 className="text-xl font-medium text-amber-300 mb-4 flex items-center">
            <Filter className="mr-2 h-5 w-5" /> Filter Options
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-amber-200 mb-1 flex items-center">
                <Calendar className="mr-1 h-4 w-4" /> Filter by Date
              </label>
              <select
                value={filterDate}
                onChange={e => setFilterDate(e.target.value)}
                className="w-full bg-amber-950/50 border border-amber-700 rounded-md px-3 py-2 text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">All Dates</option>
                {uniqueDates.map(date => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-200 mb-1">Filter by Type</label>
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="w-full bg-amber-950/50 border border-amber-700 rounded-md px-3 py-2 text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">All Types</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>
          </div>
        </div>

        {/* Menu Items Grouped by Date and Type */}
        {loading ? (
          <p className="text-amber-100">Loading...</p>
        ) : Object.keys(groupedMenuItems).length > 0 ? (
          <div className="space-y-8">
            {Object.entries(groupedMenuItems).map(([key, items]) => {
              const [date, type] = key.split('-');

              return (
                <div key={key} className="bg-amber-900/20 rounded-lg border border-amber-800/50 overflow-hidden">
                  <div className="bg-amber-900/50 px-6 py-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-amber-300">{type}</h3>
                      <p className="text-amber-200/70 text-sm">
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-amber-800/30">
                      <thead className="bg-amber-900/30">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-amber-200 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-amber-200 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-amber-200 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-amber-200 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-amber-200 uppercase tracking-wider">
                            Sufficient For
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-amber-200 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-amber-900/10 divide-y divide-amber-800/30">
                        {items.map(item => (
                          <tr key={item.id} className="hover:bg-amber-900/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img className="h-10 w-10 rounded-md object-cover" src={item.image} alt={item.name} />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-amber-200">{item.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-amber-100/70 max-w-xs truncate">{item.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-amber-300">${item.price.toFixed(2)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-amber-100">{item.quantity}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-amber-100">
                                {item.sufficientFor} person{item.sufficientFor !== 1 ? 's' : ''}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => navigate(`/admin/edit-menu/${item.id}`)}
                                className="text-amber-400 hover:text-amber-300 mr-4"
                              >
                                <Edit className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteMenuItem(item.id)}
                                className="text-red-500 hover:text-red-400"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-amber-900/30 rounded-lg border border-amber-800/50 p-8 text-center">
            <p className="text-amber-200 text-lg mb-4">No menu items found matching your criteria.</p>
            <Button variant="outline" onClick={() => { setFilterDate(''); setFilterType(''); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
