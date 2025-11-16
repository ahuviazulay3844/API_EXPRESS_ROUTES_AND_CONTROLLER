import { users } from "../db1.js";
import validateUser from "../models/user.model.js"

export const sign_up=(req,res,next)=>{
    res.send('register');
    const {code, username, email, password,borrowedBooks } = req.body;
    // בדיקה אם המשתמש כבר קיים (לפי אימייל)
    const existingUser = users.find(u => u.code === code);
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
   

}
export const sign_in=(req,res,next)=>{
    res.send('login');
    const { email, password } = req.body;
    const user=users.find(x=>x.email==email)
    if (!user) {
        return res.status(404).json({message:'user no found'});    
    }
    if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json( `hello ${user.username} ${user.email}` );
   
}
export const getAllUsers=(req,res,next)=>{
    res.send('get all users, req time: ' + (new Date() - req.currentDate));
    try {
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Internal server error while fetching users', error: error.message });
    }
   
    
}