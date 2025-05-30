import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import { Save, ArrowLeft } from 'lucide-react';
import { useMenu } from '../../context/MenuContext';

const EditMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { menuItems, updateMenuItem } = useMenu();

  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    image: '',
    type: 'Breakfast', // 'Breakfast' | 'Lunch' | 'Dinner' in TS, just string here
    date: '',
    quantity: 1,
    sufficientFor: 1,
  });

  useEffect(() => {
    if (!id) {
      navigate('/admin');
      return;
    }

    const menuItem = menuItems.find(item => item.id === id);
    if (!menuItem) {
      alert('Menu item not found');
      navigate('/admin');
      return;
    }

    setFormData({
      id: menuItem.id,
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price.toString(),
      image: menuItem.image,
      type: menuItem.type,
      date: menuItem.date,
      quantity: menuItem.quantity,
      sufficientFor: menuItem.sufficientFor,
    });
  }, [id, menuItems, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value) => {
    setFormData(prev => ({ ...prev, type: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price || !formData.image) {
      alert('Please fill out all required fields');
      return;
    }

    setLoading(true);

    try {
      const updatedItem = {
        id: formData.id,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image,
        type: formData.type,
        date: formData.date,
        quantity: formData.quantity,
        sufficientFor: formData.sufficientFor,
      };

      updateMenuItem(updatedItem);
      setSuccessMessage('Menu item updated successfully!');

      setTimeout(() => {
        setSuccessMessage('');
        navigate('/admin', { state: { success: 'Menu item updated successfully!' } });
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
            <h1 className="text-3xl font-bold text-amber-300">Edit Menu Item</h1>
            <p className="text-amber-200/70 mt-1">Update details for this menu item</p>
          </div>
          <Button variant="outline" icon={ArrowLeft} onClick={() => navigate('/admin')} disabled={loading}>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Input
                label="Item Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Avocado Toast"
                required
                disabled={loading}
              />

              <Input
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-amber-200 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="A short description of the dish..."
                rows={3}
                className="w-full px-4 py-2 bg-amber-900/30 text-amber-100 placeholder-amber-400/70 border border-amber-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                required
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Select
                label="Menu Type"
                options={[
                  { value: 'Breakfast', label: 'Breakfast' },
                  { value: 'Lunch', label: 'Lunch' },
                  { value: 'Dinner', label: 'Dinner' },
                ]}
                value={formData.type}
                onChange={handleTypeChange}
                disabled={loading}
              />

              <div>
                <label className="block text-sm font-medium text-amber-200 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-amber-900/30 text-amber-100 border border-amber-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <Input
                label="Price (Rs.)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="100"
                min="0"
                step="0"
                required
                disabled={loading}
              />

              <Input
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity.toString()}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))
                }
                placeholder="1"
                min="1"
                required
                disabled={loading}
              />

              <Input
                label="Sufficient For (persons)"
                name="sufficientFor"
                type="number"
                value={formData.sufficientFor.toString()}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, sufficientFor: parseInt(e.target.value) || 1 }))
                }
                placeholder="1"
                min="1"
                required
                disabled={loading}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="primary" icon={Save} disabled={loading}>
                {loading ? 'Updating...' : 'Update Menu Item'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditMenu;
