const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/vaccinenotify');
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    const adminExists = await User.findOne({ email: 'admin@vaccinenotify.com' });
    if (adminExists) {
        console.log('Admin already exists');
        process.exit();
    }

    await User.create({
        name: 'Super Admin',
        email: 'admin@vaccinenotify.com',
        password: 'adminpassword123',
        role: 'admin'
    });

    console.log('Admin User Created');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
