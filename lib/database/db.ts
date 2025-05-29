import mongoose from "mongoose";

export const ConnectDb = async() =>{
   try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Database Connected");
    
   } catch (error) {
        console.log("Error: Database not connected");    
   }
}