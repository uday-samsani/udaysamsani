const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MongoUri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (error) {
        console.log('DB connection failed');
        console.log(error);
    }
};

module.exports = connectDB;
