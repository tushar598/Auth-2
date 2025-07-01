import mongoose from "mongoose";
import dotenv from "dotenv";

const connectdb = async () => {
    const mongoURL = process.env.MONGODB_URL;
    if (!mongoURL){
        console.error("Monogodb url not define in .env file..")
        process.exit(1)
    } 
    try {
        const connect = await mongoose.connect(mongoURL)
        console.log(`✅ Monogodb connected : ${connect.connection.host}`)
    } catch (error) {
        console.error(`Monogdb connection error : ${error.message}`)
        process.exit(1)
    }
}

export default connectdb;