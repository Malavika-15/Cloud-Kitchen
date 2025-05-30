import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import { Plus, Minus, Save, ArrowLeft } from 'lucide-react';
import { useMenu } from '../../context/MenuContext';

const AddMenu = () => {
  const navigate = useNavigate();
  const { addMenuItem } = useMenu();
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [menuData, setMenuData] = useState({
    type: 'Breakfast',
    date: new Date().toISOString().split('T')[0],
    items: [
      {
        name: '',
        description: '',
        price: '',
        image: null,
        quantity: 1,
        sufficientFor: 1,
      },
    ],
  });

  const handleTypeChange = (value) => {
    setMenuData((prev) => ({ ...prev, type: value }));
  };

  const handleDateChange = (e) => {
    setMenuData((prev) => ({ ...prev, date: e.target.value }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...menuData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setMenuData((prev) => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setMenuData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          name: '',
          description: '',
          price: '',
          image: null,
          quantity: 1,
          sufficientFor: 1,
        },
      ],
    }));
  };

  const removeItem = (index) => {
    if (menuData.items.length === 1) return;
    const updatedItems = menuData.items.filter((_, i) => i !== index);
    setMenuData((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = menuData.items.some(
      (item) => !item.name || !item.description || !item.price || !item.image
    );

    if (hasErrors) {
      alert('Please fill out all required fields for each menu item');
      return;
    }

    setLoading(true);

    try {
      menuData.items.forEach((item) => {
        const imageUrl = item.image ? URL.createObjectURL(item.image) : '';

        addMenuItem({
          name: item.name,
          description: item.description,
          price: parseFloat(item.price),
          image: imageUrl,
          type: menuData.type,
          date: menuData.date,
          quantity: item.quantity,
          sufficientFor: item.sufficientFor,
        });
      });

      setSuccessMessage('Menu items added successfully!');

      setTimeout(() => {
        setSuccessMessage('');
        navigate('/admin', { state: { success: 'Menu items added successfully!' } });
      }, 2000);
    } catch (error) {
      alert(`Error: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-amber-300">Add New Menu Items</h1>
            <p className="text-amber-200/70 mt-1">Create and add new items to your menu</p>
          </div>
          <Button
            variant="outline"
            icon={ArrowLeft}
            onClick={() => navigate('/admin')}
            disabled={loading}
          >
            Back to Dashboard
          </Button>
        </div>

        {successMessage && (
          <div className="bg-green-600/20 border border-green-500/50 text-green-300 px-4 py-3 rounded mb-6">
            {successMessage}
          </div>
        )}

        <div className="bg-amber-900/20 rounded-lg border border-amber-800/50 p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Select
                label="Menu Type"
                options={[
                  { value: 'Breakfast', label: 'Breakfast' },
                  { value: 'Lunch', label: 'Lunch' },
                  { value: 'Dinner', label: 'Dinner' },
                ]}
                value={menuData.type}
                onChange={handleTypeChange}
              />

              <div>
                <label className="block text-sm font-medium text-amber-200 mb-1">Date</label>
                <input
                  type="date"
                  value={menuData.date}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 bg-amber-900/30 text-amber-100 border border-amber-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            <h3 className="text-xl font-medium text-amber-300 mb-4 border-b border-amber-800/50 pb-2">
              Menu Items
            </h3>

            {menuData.items.map((item, index) => (
              <div
                key={index}
                className="bg-amber-900/30 rounded-lg p-6 mb-6 border border-amber-800/30"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-amber-300">Item #{index + 1}</h4>
                  {menuData.items.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Minus}
                      onClick={() => removeItem(index)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      disabled={loading}
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <Input
                    label="Item Name"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    placeholder="e.g., Avocado Toast"
                    required
                    disabled={loading}
                  />

                  <div>
                    <label className="block text-sm font-medium text-amber-200 mb-1">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleItemChange(index, 'image', e.target.files ? e.target.files[0] : null)
                      }
                      className="w-full px-4 py-2 bg-amber-900/30 text-amber-100 border border-amber-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-amber-200 mb-1">Description</label>
                  <textarea
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="A short description of the dish..."
                    rows={3}
                    className="w-full px-4 py-2 bg-amber-900/30 text-amber-100 placeholder-amber-400/70 border border-amber-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <Input
                    label="Price (Rs.)"
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    placeholder="100"
                    min="0"
                    step="0"
                    required
                    disabled={loading}
                  />

                  <Input
                    label="Quantity"
                    type="number"
                    value={item.quantity.toString()}
                    onChange={(e) =>
                      handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)
                    }
                    placeholder="1"
                    min="1"
                    required
                    disabled={loading}
                  />

                  <Input
                    label="Sufficient For (persons)"
                    type="number"
                    value={item.sufficientFor.toString()}
                    onChange={(e) =>
                      handleItemChange(index, 'sufficientFor', parseInt(e.target.value) || 1)
                    }
                    placeholder="1"
                    min="1"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                icon={Plus}
                onClick={addItem}
                className="border-amber-600"
                disabled={loading}
              >
                Add Another Item
              </Button>

              <Button type="submit" variant="primary" icon={Save} disabled={loading}>
                {loading ? 'Saving...' : 'Save Menu Items'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddMenu;
