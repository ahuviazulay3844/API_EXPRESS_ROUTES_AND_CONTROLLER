import { users } from "../db1.js";
import {validateUser} from "../models/user.model.js"

export const sign_up=(req,res,next)=>{
    const {code, username, email, password,borrowedBooks } = req.body;
    // בדיקה אם המשתמש כבר קיים (לפי אימייל)
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({ message: 'User with this email already exists' });
    }
    const newUser = {
        code,
        username,
        email,
        password, 
        borrowedBooks
    };
    users.push(newUser);
   
    res.send('register');

}
export const sign_in=(req,res,next)=>{
    const { email, password } = req.body;
    const user=users.find(x=>x.email===email)
    if (!user) {
        return res.status(404).json({message:'user no found'});    
    }
    if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ 
        message: `hello ${user.username}`,
        email: user.email
    });

}
export const getAllUsers=(req,res,next)=>{
  res.json(users);
   

}