import express from 'express';
import { DateMiddleware } from "./middlewares/Date.middlewares.js";
import { errorHandler,UrlerrorHandler } from './middlewares/error.middlewares.js';
import  bookrouter from "./routes/book.route.js";
import useroute from "./routes/user.route.js";
import { Printmiddlewares } from './middlewares/Print.middlewares.js';
import cors from "cors";
import  {validateUseBooks}  from './models/books.model.js';
import {validateUser} from "./models/user.model.js";
import morgan from 'morgan';
import { connectDB } from './config/db3.js'; // נניח ש-connectDB נמצא כאן
import { config } from 'dotenv';


//Request (בקשה)
//Response (תגובה)

//יוצר שרת
const app=express();

// .env-קורא את כל קבצי ה
// process.env ומכניס את הערכים כאוביקט לתוך
config();
// כדי שיצליח לקבל באדי
app.use(express.json());
// התחברות לדטהבייס
connectDB();

// app.use(fileUpload({
//     // הגבלת גודל: 1 מגה-בייט (1MB = 1024 * 1024 בתים)
//     limits: { fileSize: 1 * 1024 * 1024 }, 
// }));
app.use('/books', bookrouter);
app.use('/users',DateMiddleware,Printmiddlewares,useroute);
app.use(cors());//נותן גישה לCLIENT
app.use(morgan('dev'));

app.use(UrlerrorHandler);
app.use(errorHandler);
// 2. קבצים סטטיים - כלומר כאשר נחפש את הקובץ יחפש בתיקיה הזו
//    fs-ויחזיר את תוכן הקובץ בלי להשתמש ב
app.use(express.static('public'));
// BASE_URL='http://localhost:5000/books';
//החזרה  
// method: GET בקשת-פעולות 
//url:http://localhost:5000  
const port = 5000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});