import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

try {
    mongoose.connect("mongodb+srv://sibingeorge009:MaryGeorge256@sibincluster.ptohacb.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}

mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
});
