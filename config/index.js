const mongoose = require('mongoose');

async function connectDb(DB_URL) {
  try {
    await mongoose.connect(DB_URL);
    console.log('Database connected...');
  } catch (error) {
    console.log(error);
  }
}
module.exports = connectDb;