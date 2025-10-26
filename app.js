import express from 'express';
BASE_URL='http://localhost:5000/books';
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
res.json(b)//מחזיר את הספר

// method: POST בקשת
// url: http://localhost:5000/books
//הוספת ספר
app.post('/books', (req, res) => {
    books.push(req.body)
    res.send(req.body);
});
//עידכון
// method: put בקשת
// url: http://localhost:5000/books/:code
app.put('/books/:code', (req, res) => {
    const code =B006; // הקוד שמגיע ב־URL
    const { price } = req.body;   // המחיר החדש מבקשת ה־body
  
    const bookIndex = books.findIndex(book => book.code === code);
    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found' });
    }
    books[bookIndex].price = price; // עדכון המחיר
    res.send(req.body);
  
    res.json(books[bookIndex]); // מחזיר את הספר המעודכן
  });
  