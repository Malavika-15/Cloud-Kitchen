require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads folder if not exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(uploadsDir));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Models
const MenuItem = require('./models/MenuItem');
const User = require('./models/User');
const AdminModel = require('./models/Admin'); // make sure this file exists

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/team', require('./routes/team'));
app.use('/api/values', require('./routes/values'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/newsletter', require('./routes/newsletter'));

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });


// Upload menu with images
app.post('/api/menu/upload', authenticateToken, upload.array('images'), async (req, res) => {
  try {
    const { type, date, items } = req.body;
    const parsedItems = JSON.parse(items);
    const uploadedFiles = req.files;

    const itemsWithImages = parsedItems.map((item, index) => ({
      ...item,
      price: Number(item.price),
      image: uploadedFiles[index] ? `/uploads/${uploadedFiles[index].filename}` : '',
    }));

    const newMenu = new MenuItem({ type, date, items: itemsWithImages });
    await newMenu.save();

    res.status(201).json({ message: 'Menu items added successfully!' });
  } catch (error) {
    console.error('Error uploading menu:', error);
    res.status(400).json({ error: 'Failed to save menu items' });
  }
});

// Get menu items by date/type
app.get('/api/menu', async (req, res) => {
  try {
    const { date, type } = req.query;
    const filter = {};
    if (date) filter.date = date;
    if (type) filter.type = type;

    const menuItems = await MenuItem.find(filter).exec();
    res.json({ menuItems });
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all menu items (admin)
app.get('/api/menu/all', authenticateToken, async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching all menu items:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add simple menu item without image
app.post('/api/menu', authenticateToken, async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add item' });
  }
});

// Delete menu item
app.delete('/api/menu/:id', authenticateToken, async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete item' });
  }
});

// Update menu item by ID

app.put('/api/menu/:id', async (req, res) => { const { id } = req.params;
  const {
    name,
    description,
    price,
    image,
    type,
    date,
    quantity,
    sufficientFor,
  } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ message: 'Name, price, and image are required' });
  }

  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        image,
        type,
        date,
        quantity,
        sufficientFor,
      },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
});


// Get logged-in user details
app.get('/api/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});


// Admin login
app.post('/api/login', async (req, res) => {
  try {
    console.log('Login request received');
    console.log('Request body:', req.body);
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      console.log('Admin not found for:', email); 
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log('Password match:', isMatch);
    if (!isMatch) {
      console.log('Incorrect password');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log('JWT_SECRET is:', process.env.JWT_SECRET);
    console.log('Generated token:', token);

    res.json({ email: admin.email, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Logout 
app.post('/api/logout', (req, res) => {
  res.json({ message: 'Logged out' });
});

app.get('/', (req, res) => res.send('Cloud Kitchen Backend Running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
