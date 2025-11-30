import { mongoose } from  "mongoose";
export const connectDB=async()=>{
     // ברירת מחדל שרת מקומי
     const DB_URI = process.DB_URI || 'mongodb://localhost:27017/catalog/Library';
     try {
        await mongoose.connect(DB_URI); // חזר פרומיס
        console.log(`mongo connected succesfuly to ${DB_URI}`);        
    } catch (error) {
        console.log(`mongo connection falied`, error.message);        
    }
};
