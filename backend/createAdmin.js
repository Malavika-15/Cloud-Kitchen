require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

  const existingAdmin = await User.findOne({ email: 'admin@example.com' });
  if (existingAdmin) {
    console.log('Admin already exists');
    process.exit(0);
  }

  const admin = new User({
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  });

  await admin.save();
  console.log('Admin user created');
  console.log('Connected to DB:', mongoose.connection.name);
  process.exit(0);
}

createAdmin();
