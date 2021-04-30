const mongoose = require('mongoose');

const uri = process.env.DB_PATH

const DBConnection = async () => {
   try {
      await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
      console.log('Database is successfully connected')
   } catch (error) {
      console.log('Connection Failed. Internal Server Error')
   }
}

module.exports = DBConnection;

