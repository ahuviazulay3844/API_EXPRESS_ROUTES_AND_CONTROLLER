import express from 'express';
import  {books} from './db.js';
import  {users} from './db1.js';
import { DateMiddleware } from "./middlewares/Date.middlewares.js";
import { errorHandler } from './middlewares/error.middlewares.js';
import { UrlerrorHandler } from './middlewares/Url.Error.middlewares.js';
import  bookrouter from "./routes/book.route.js";
import useroute from "./routes/user.route.js";
import { Printmiddlewares } from './middlewares/Print.middlewares.js';
//Request (בקשה)
//Response (תגובה)
//יוצר שרת
const app=express();
// כדי שיצליח לקבל באדי
app.use(express.json());
app.use('/books', bookrouter);
app.use('/users',DateMiddleware,Printmiddlewares,useroute);
app.use(UrlerrorHandler);
app.use(errorHandler);
// BASE_URL='http://localhost:5000/books';
//החזרה  
// method: GET בקשת-פעולות 
//url:http://localhost:5000  
const port = 5000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});