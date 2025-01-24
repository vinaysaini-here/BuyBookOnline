import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        const conn  = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`database connected sucessfully ${conn.connection.host}`);
        
    } catch (error) {
        console.log("error in connnection : ", error);
        
    }
};

// connectDB();