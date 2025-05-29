import mongoose from "mongoose";

export const ConnectDb = async() =>{
   try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Database Connected");
    
   } catch { // Remove unused error parameter
        console.log("Error: Database not connected");    
   }
}