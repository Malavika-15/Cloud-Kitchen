import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialMenuItems, generateId } from '../utils/menuData';

const MenuContext = createContext(undefined);

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);

  // Initialize menu items from local storage or default data
  useEffect(() => {
    const savedItems = localStorage.getItem('menuItems');
    if (savedItems) {
      setMenuItems(JSON.parse(savedItems));
    } else {
      setMenuItems(initialMenuItems);
    }
  }, []);

  // Save menu items to local storage whenever they change
  useEffect(() => {
    if (menuItems.length > 0) {
      localStorage.setItem('menuItems', JSON.stringify(menuItems));
    }
  }, [menuItems]);

  const addMenuItem = (item) => {
    const newItem = { ...item, id: generateId() };
    setMenuItems(prev => [...prev, newItem]);
  };

  const updateMenuItem = (updatedItem) => {
    setMenuItems(prev =>
      prev.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const deleteMenuItem = (id) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const getMenuItemsByDate = (date) => {
    return menuItems.filter(item => item.date === date);
  };

  const getMenuItemsByType = (type) => {
    return menuItems.filter(item => item.type === type);
  };

  const getTodayMenuItems = () => {
    const today = new Date().toISOString().split('T')[0];
    return getMenuItemsByDate(today);
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        getMenuItemsByDate,
        getMenuItemsByType,
        getTodayMenuItems,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
