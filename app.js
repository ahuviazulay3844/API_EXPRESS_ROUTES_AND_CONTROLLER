import express, { Router } from 'express';
import { books } from './db.js';
import  bookrouter from "./routes/book.route.js"
import useroute from "./routes/user.route.js"
//Request (בקשה)
//Response (תגובה)
//יוצר שרת
const app=express();
// כדי שיצליח לקבל באדי
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// BASE_URL='http://localhost:5000/books';
//החזרה  
// method: GET בקשת-פעולות 
//url:http://localhost:5000  
const port = 5000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
app.use('/books', bookrouter);
app.use('/user', useroute);