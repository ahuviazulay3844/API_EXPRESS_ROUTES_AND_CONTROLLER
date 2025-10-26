import express from 'express';
//יוצר שרת
const app=express();
// כדי שיצליח לקבל באדי
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import { books } from './db';
// method: GET בקשת-פעולות 
//url:http://localhost:5000  
const port = 5000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
//http://localhost:5000/books
//מחזיר את כל הספרים
app.get('/books',(req, res))//req-לבקש בקשה,res-להחזיר
res.json("/books")


//http://localhost:5000/books/id
//מחזיר את כל הספרים
app.get('/books/:id',(req, res))//req-לבקש בקשה,res-להחזיר
const b=books.find(x=>x.code==req.query.code);
res.json(b)

// method: POST בקשת
// url: http://localhost:3000/products
//הוספת ספר
app.post('/books', (req, res) => {
    books.push(req.body)
    res.send(req.body);
});

