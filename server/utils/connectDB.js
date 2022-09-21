const { default: mongoose } = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { serverSelectionTimeoutMS: 3000 });
        console.log(`Connected to DB`);
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
