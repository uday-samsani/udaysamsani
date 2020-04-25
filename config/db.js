const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log(process.env.MongoUri);
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
        // Process exits with a failure
        process.exit(1);
    }
};

module.exports = connectDB;
