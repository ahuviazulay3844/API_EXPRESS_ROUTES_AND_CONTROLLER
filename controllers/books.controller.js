import { books } from "../db.js";
import {validateUseBooks} from "../models/books.model.js";
// הראוטר יכיל את כל הניתובים ששייכים למשאב מסוים
// resource - משאב
// URL - מושפע משם המשאב בד"כ ברבים
// http://localhost:3000/products
//http://localhost:5000/books
//מחזיר את כל הספרים
export const getAllBooks =(req,res,next)=>{//req-לבקש בקשה,res-להחזיר
    res.json(books)
    };
    //http://localhost:5000/books/id
    //מחזיר את כל הספרים
 export const getBookById =(req,res,next)=>{//req-לבקש בקשה,res-להחזיר
    const bookId = req.params.id;
    const b=books.find(x=>x.code===bookId);
    if (!b) {
        return res.status(404).json({ message: `Book with code ${bookId} not found.` });
    }
    res.json(b);// מחזיר את הספר שנמצא
    };
    // method: POST בקשת
    // url: http://localhost:5000/books
    //הוספת ספר
  export const addBook =(req,res,next) => {
 
        const newBook = {
            code: `B${books.length + 1}`, // קוד אוטומטי
            isBorrowed: false, // ברירת מחדל
            borrowingHistory: [], // ברירת מחדל
            ...req.body //מכניס נתונים..
        };
        books.push(newBook);
        res.send('addBook');
    };
    //עידכון
    // method: put בקשת
    // url: http://localhost:5000/books/:code
 export  const updateBook = (req,res,next) => {
        const code =req.params.id; // הקוד שמגיע ב־URL
        const { price } = req.body;   // המחיר החדש מבקשת ה־body
        const bookIndex = books.findIndex(book => book.code === code);
        if (bookIndex === -1) {
          return res.status(404).json({ message: 'Book not found' });
        }
        books[bookIndex].price = price; // עדכון המחיר
        books[bookIndex].name = req.body.name;
        books[bookIndex].category = req.body.category;
        // res.send(req.body);
        res.json(books[bookIndex]); // מחזיר את הספר המעודכן
        res.send('updateBook');

      };
      //השאלת ספר
      // url: http://localhost:5000/books/borrow/:code
 export  const borrowingabook  =(req,res,next) => {
    const bookCode = req.params.code;
    const { id_cust } = req.body;
      const bookt = books.findIndex(b => b.code === bookCode);
      const book = books[bookt];
      if (bookt === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
      if (book.isBorrowed) {
        return res.status(400).json({ message: 'Book is currently borrowed and cannot be re-borrowed.'
    })
    };
    // 3. ביצוע ההשאלה: עדכון השדה isBorrowed
    book.isBorrowed = true;
    const today = new Date().toISOString().split('T')[0];
    // 4. עדכון מערך ההשאלות (borrowingHistory)
    book.borrowingHistory.push({
        dateBorrowed: today,
        customerCode: id_cust
    });
    res.json({ message: 'Book successfully borrowed', updatedBook: book });
    };
    // 7. PUT /books/return/:code:ת ספרחזרה
export const  Returningabook  = (req,res,next) => {
        const bookCode = req.params.code;
        const bookIndex = books.findIndex(b => b.code === bookCode);
    
        if (bookIndex === -1) {
            return res.status(404).json({ message: 'Book not found' });
        }
    
        const book = books[bookIndex];
    
        // בדיקה: אם הספר אינו מושאל?
        if (!book.isBorrowed) {
            return res.status(400).json({ message: 'Book is not currently borrowed.' });
        }
    
        // ביצוע החזרה: עדכון isBorrowed ל-false
        book.isBorrowed = false;
    
        res.json({ message: 'Book successfully returned', updatedBook: book });
    };
    
    // 8. DELETE /books/:code: מחיקת ספר
export const deleteBook =(req,res,next) => {
        //בעצם מה שקולט הקוד
        const bookCode = req.params.code;
    
        const bookIndex = books.findIndex(b => b.code === bookCode);
    
        if (bookIndex === -1) {
            return res.status(404).json({ message: 'Book not found' });
        } 
        // מחיקת הספר מהמערך באמצעות splice
        const deletedBook = books.splice(bookIndex, 1);
    
        // מחזיר סטטוס 204 No Content או הודעת הצלחה
        res.status(200).json({ message: `Book with code ${bookCode} successfully deleted.`, deletedBook: deletedBook[0] });
    };
