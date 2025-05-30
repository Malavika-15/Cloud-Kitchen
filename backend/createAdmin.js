require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AdminModel = require('./models/Admin'); // path to your Admin model

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/CloudKitchen';

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    const email = 'admin@example.com';     // your admin email
    const password = 'admin123';           // your admin password

    // Check if admin already exists
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists with email:', email);
      mongoose.disconnect();
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin user
    const admin = new AdminModel({
      name: 'Admin',     
      email,
      password: hashedPassword,
    });

    await admin.save();
    console.log('Admin user created:', email);
    mongoose.disconnect();
  } catch (error) {
    console.error('Error creating admin:', error);
    mongoose.disconnect();
  }
}

createAdmin();
