import { books } from "../db.js";
import { isValidObjectId } from "mongoose";

import {validateUseBooks} from "../models/books.model.js";
// הראוטר יכיל את כל הניתובים ששייכים למשאב מסוים
// resource - משאב
// URL - מושפע משם המשאב בד"כ ברבים
// http://localhost:3000/products
//http://localhost:5000/books
//מחזיר את כל הספרים
export const getAllBooks =async (req,res,next)=>{//req-לבקש בקשה,res-להחזיר
    try {
        const { page = 1, limit = 5, name = '' } = req.query;
        // כאן לא מקובל להחזיר סטטוס 404 אם לא מצאנו
        // אלא מחזירים סטטוס 200 עם מערך ריק
        // חיפוש לפי מה שמכיל את הערך בניים
        // /a/i
        // מכיל איי גדולה/קטנה
        // שיטה שניה יותר דינאמית
        // new RegExp('a', 'i')
        const result = await Product.find({ name: new RegExp(name, 'i') })
            .skip((page - 1) * limit) // כמה לדלג
            .limit(limit);// כמה תוצאות להחזיר לכל היותר
        // pagintation - עימוד
        // const result = products
        //     .filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
        //     .slice((page - 1) * limit, page * limit);
        // json להחזרת אוביקטים
        res.json(result);
    } catch (error) {
        // ילך למידלוואר של השגיאות עם שגיאת שרת דיפולטיבית
        next({});
    }
    };
    //http://localhost:5000/books/id
    //מחזיר את כל הספרים
 export const getBookById =(req,res,next)=>{//req-לבקש בקשה,res-להחזיר
    const bookId = req.params.id;
   
    try {
    if (!isValidObjectId(bookId)) {
        return res.status(404).json({ message: `Book with code ${bookId} not found.` });
    }
    const b=books.find(x=>x.code===bookId);  
    if (!b) {
        // מחזירים סטטוס של שגיאה
        // json חובה להחזיר אותו לפני שכותבים
        // res.status(404).json({ message: `product ${id} not found!` });
        // next - מקבל פרמטר הולך אוטומטית למידלוואר של השגיאות
        return next({ status: 404, message: `product ${id} not found!` });
    }

    // json להחזרת אוביקטים
    // RESTful כך מקובל להחזיר משרת
    // אם לא כתבנו סטטוס יחזיר 200
    res.json(b);
} catch (error) {
    // ילך למידלוואר של השגיאות עם שגיאת שרת דיפולטיבית
    next({ message: error.message });
}
};
    // method: POST בקשת
    // url: http://localhost:5000/books
    //הוספת ספר
  export const addBook =async (req,res,next) => {
 
        const newBook = {
            code: `B${books.length + 1}`, // קוד אוטומטי
            isBorrowed: false, // ברירת מחדל
            borrowingHistory: [], // ברירת מחדל
            ...req.body //מכניס נתונים..
        };
        try {
            // 2. שמירה בדטהבייס ( )
            await newBook.save(); 
    
            // 3. החזרת האובייקט כפי שנשמר
            res.status(201).json(newBook); 
        } catch (error) {
            next(error); // שולח שגיאה למדלוואר הטיפול בשגיאות
        }        
    };
    //עידכון
    // method: put בקשת
    // url: http://localhost:5000/books/:code
//  export  const updateBook = (req,res,next) => {
//         const code =req.params.id; // הקוד שמגיע ב־URL
//         const { price } = req.body;   // המחיר החדש מבקשת ה־body
//         const bookIndex = books.findIndex(book => book.code === code);
//         if (bookIndex === -1) {
//           return res.status(404).json({ message: 'Book not found' });
//         }
//         books[bookIndex].price = price; // עדכון המחיר
//         books[bookIndex].name = req.body.name;
//         books[bookIndex].category = req.body.category;
//         // res.send(req.body);
//         res.json(books[bookIndex]); // מחזיר את הספר המעודכן
//         res.send('updateBook');

//       };
export const updateBook = async (req, res, next) => {
    // 1. קבלת ה-ID (המזהה של MongoDB) מפרמטרי הנתיב
    const id = req.params.id; 
    
    // 2. קבלת הנתונים לעדכון מגוף הבקשה (BODY)
    // הערה: נשתמש ב-req.body המלא לעדכון כללי (כולל price, name, category)
    
    try {
        // 3. עדכון במסד הנתונים באמצעות findByIdAndUpdate
        const updatedBook = await books.findByIdAndUpdate(
            id,
            { 
                $set: req.body 
            }
           
        );

       
        if (!updatedBook) {
            // החזרת שגיאת 404 Not Found והעברה למידלוואר שגיאות
            return next({ status: 404, message: `Book with ID ${id} not found!` });
        }

        // 5. החזרת הספר המעודכן ללקוח
        res.json(updatedBook); 
        
    } catch (error) {
        // טיפול בשגיאות טכניות (כגון ID לא תקין או בעיות חיבור)
        next({ message: error.message }); 
    }
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
