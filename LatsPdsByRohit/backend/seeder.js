const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Shop = require('./src/models/Shop');
const Allocation = require('./src/models/Allocation');
const Transaction = require('./src/models/Transaction');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Shop.deleteMany();
    await Allocation.deleteMany();
    await Transaction.deleteMany();

    const createdUsers = await User.insertMany([
      {
        name: 'Admin User',
        phone: '1234567890',
        password: 'password123',
        role: 'Admin',
      },
      {
        name: 'Ramesh Kumar',
        phone: '9876543210',
        password: 'password123',
        rationCardNumber: 'RC123456789',
        aadharNumber: '111122223333',
        role: 'Citizen',
      }
    ]);

    const adminUser = createdUsers[0]._id;
    const citizenUser = createdUsers[1]._id;

    const createdShops = await Shop.insertMany([
      {
        name: 'FPS Main Market',
        shopId: 'FPS-001',
        location: 'Main Market, City Center',
        ownerName: 'Suresh Kumar',
        inventory: [
          { itemType: 'Wheat', availableQuantity: 500 },
          { itemType: 'Rice', availableQuantity: 300 }
        ]
      }
    ]);

    await Allocation.insertMany([
      {
        user: citizenUser,
        itemType: 'Wheat',
        quantity: 20,
        monthYear: 'Oct 2026',
        status: 'Pending',
      },
      {
        user: citizenUser,
        itemType: 'Rice',
        quantity: 15,
        monthYear: 'Oct 2026',
        status: 'Pending',
      }
    ]);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // destroy data logic (omitted for brevity)
} else {
  importData();
}
