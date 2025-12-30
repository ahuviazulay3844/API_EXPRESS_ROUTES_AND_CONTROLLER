
import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
const DB_URI = `mongodb+srv://ahuviazulay_db_user:A38443844A@cluster0.zonws9n.mongodb.net/UserDB`;
// הוספה+חיבור
try {
    await mongoose.connect(DB_URI);
    console.log('mongo connected successfully');

    // יצירת משתמש 
    const user1 = new User({
        username: 'ahuvi',
        email: 'ahuvi@example.com',
        password: 'password123', 
        code: 'A123',
        borrowedBooks: ['Mahallalal', 'Wanted']
    });

    await user1.save();
    console.log('User saved successfully!');
} catch (error) {
    console.log('ERROR:', error.message);
}