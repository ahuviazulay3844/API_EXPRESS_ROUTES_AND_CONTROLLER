// import { books } from "../db.js";
import { isValidObjectId } from "mongoose";
import Book, { validateUseBooks } from "../models/books.model.js";
// הראוטר יכיל את כל הניתובים ששייכים למשאב מסוים
// resource - משאב
// URL - מושפע משם המשאב בד"כ ברבים
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
        const result = await Book.find({ name: new RegExp(name, 'i') })
            .skip((page - 1) * limit) // כמה לדלג
            .limit(limit);// כמה תוצאות להחזיר לכל היותר
        // pagintation - עימוד
        // const result = books
        //     .filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
        //     .slice((page - 1) * limit, page * limit);
        // json להחזרת אוביקטים
        res.json(result);
    } catch (error) {
        // ילך למידלוואר של השגיאות עם שגיאת שרת דיפולטיבית
        next({ message: error.message});
    }
    };
    //http://localhost:5000/books/id
    //מחזיר את כל הספרים
 export const getBookById =async (req,res,next)=>{//req-לבקש בקשה,res-להחזיר
    const bookId = req.params.id;
   
    try {
    if (!isValidObjectId(bookId)) {
        return res.status(404).json({ message: `Book with code ${bookId} not found.` });
    }
    const b= await Book.findById(bookId)
    if (!b) {
        // מחזירים סטטוס של שגיאה
        // json חובה להחזיר אותו לפני שכותבים
        // res.status(404).json({ message: `books ${id} not found!` });
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
 
        const newBook = new Book
        ({
            // code: `B${books.length + 1}`, // קוד אוטומטי
            // isBorrowed: false, // ברירת מחדל
            // borrowingHistory: [], // ברירת מחדל
            ...req.body //מכניס נתונים..
        });
        try {
            // 2. שמירה בדטהבייס ( )
            await newBook.save(); 
    
            // 3. החזרת האובייקט כפי שנשמר
            res.status(201).json(newBook); 
        } catch (error) {
            next(error); // שולח שגיאה למדלוואר הטיפול בשגיאות
        }        
    };
  
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
  //עידכון
    // method: put בקשת
    // url: http://localhost:5000/books/:code
export const updateBook = async (req, res, next) => {
    // 1. קבלת ה-ID (המזהה של MongoDB) מפרמטרי הנתיב
    const id = req.params.id; 
    
    // 2. קבלת הנתונים לעדכון מגוף הבקשה (BODY)
    // הערה: נשתמש ב-req.body המלא לעדכון כללי (כולל price, name, category)
    
    try {
        // 3. עדכון במסד הנתונים באמצעות findByIdAndUpdate
        const updatedBook = await Book.findByIdAndUpdate(
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
//  export  const borrowingabook  =(req,res,next) => {
//     const bookCode = req.params.code;
//     const { id_cust } = req.body;
//       const bookt = books.findIndex(b => b.code === bookCode);
//       const book = books[bookt];
//       if (bookt === -1) {
//         return res.status(404).json({ message: 'Book not found' });
//     }
//       if (book.isBorrowed) {
//         return res.status(400).json({ message: 'Book is currently borrowed and cannot be re-borrowed.'
//     })
//     };
//     // 3. ביצוע ההשאלה: עדכון השדה isBorrowed
//     book.isBorrowed = true;
//     const today = new Date().toISOString().split('T')[0];
//     // 4. עדכון מערך ההשאלות (borrowingHistory)
//     book.borrowingHistory.push({
//         dateBorrowed: today,
//         customerCode: id_cust
//     });
//     res.json({ message: 'Book successfully borrowed', updatedBook: book });
//     };
// השאלת ספר
// url: http://localhost:5000/books/borrow/:id
export const borrowingabook = async (req, res, next) => { // תוקן ל-async ומול Mongoose
    // 1. ולידציה ל-customerCode
    const { error } = validateUseBooks.borrowBook.validate(req.body);
    if (error) {
        return next({ status: 400, message: error.details[0].message });
    }

    const bookId = req.params.code; // מניח שהפרמטר בנתיב הוא :code
    const { id_cust } = req.body;

    try {
        // מציאת הספר
        const book = await Book.findById(bookId);

        if (!book) {
            return next({ status: 404, message: 'Book not found' });
        }

        // בדיקה: אם הספר כבר מושאל
        if (book.isBorrowed) {
            return next({ status: 400, message: 'Book is currently borrowed and cannot be re-borrowed.' });
        }

        // 3. עדכון ה-isBorrowed והיסטוריית ההשאלה
        book.isBorrowed = true;
        book.borrowingHistory.push({
            dateBorrowed: new Date(),
            customerCode: id_cust
        });

        // 4. שמירה בבסיס הנתונים
        const updatedBook = await book.save();

        res.json({ message: 'Book successfully borrowed', updatedBook });
    } catch (error) {
        next({ message: error.message });
    }
};

    // 7. PUT /books/return/:code:ת ספרחזרה
// export const  Returningabook  = (req,res,next) => {
//         const bookCode = req.params.code;
//         const bookIndex = books.findIndex(b => b.code === bookCode);
    
//         if (bookIndex === -1) {
//             return res.status(404).json({ message: 'Book not found' });
//         }
    
//         const book = books[bookIndex];
    
//         // בדיקה: אם הספר אינו מושאל?
//         if (!book.isBorrowed) {
//             return res.status(400).json({ message: 'Book is not currently borrowed.' });
//         }
    
//         // ביצוע החזרה: עדכון isBorrowed ל-false
//         book.isBorrowed = false;
    
//         res.json({ message: 'Book successfully returned', updatedBook: book });
//     };
    // 7. PUT /books/return/:id: החזרת ספר
export const Returningabook = async (req, res, next) => { // תוקן ל-async ומול Mongoose
    const bookId = req.params.code; // מניח שהפרמטר בנתיב הוא :code

    try {
        // 1. מציאת הספר
        const book = await Book.findById(bookId);

        if (!book) {
            return next({ status: 404, message: 'Book not found' });
        }

        // 2. בדיקה: אם הספר אינו מושאל?
        if (!book.isBorrowed) {
            return next({ status: 400, message: 'Book is not currently borrowed.' });
        }

        // 3. ביצוע החזרה: עדכון isBorrowed ל-false
        book.isBorrowed = false;

        // 4. עדכון תאריך ההחזרה לפריט ההשאלה האחרון (אם קיים)
        const lastBorrowing = book.borrowingHistory[book.borrowingHistory.length - 1];
        if (lastBorrowing && !lastBorrowing.dateReturned) {
            lastBorrowing.dateReturned = new Date();
        }

        // 5. שמירה בבסיס הנתונים
        const updatedBook = await book.save();

        res.json({ message: 'Book successfully returned', updatedBook });

    } catch (error) {
        next({ message: error.message });
    }
};

    // 8. DELETE /books/:code: מחיקת ספר
// export const deleteBook =(req,res,next) => {
//         //בעצם מה שקולט הקוד
//         const bookCode = req.params.code;
    
//         const bookIndex = books.findIndex(b => b.code === bookCode);
    
//         if (bookIndex === -1) {
//             return res.status(404).json({ message: 'Book not found' });
//         } 
//         // מחיקת הספר מהמערך באמצעות splice
//         const deletedBook = books.splice(bookIndex, 1);
    
//         // מחזיר סטטוס 204 No Content או הודעת הצלחה
//         res.status(200).json({ message: `Book with code ${bookCode} successfully deleted.`, deletedBook: deletedBook[0] });
//     };
// 8. DELETE /books/:id: מחיקת ספר
export const deleteBook = async (req, res, next) => { // תוקן ל-async ומול Mongoose
    // 1. קבלת ה'code' מהפרמטרים של הנתיב (כפי שהוגדר בראוטר)
    const bookCode = req.params.code; 

    try {
        // 2. מחיקת הספר מה-DB
        // *** תוקן: שימוש ב-findOneAndDelete כדי לחפש לפי השדה 'code' במקום לפי '_id' ***
        const deletedBook = await Book.findOneAndDelete({ code: bookCode });

        if (!deletedBook) {
            // הספר לא נמצא
            return next({ status: 404, message: `Book with code ${bookCode} not found` });
        }

        // 3. מחזיר סטטוס 200 (או 204 No Content)
        res.status(200).json({ message: `Book with code ${bookCode} successfully deleted.`, deletedBook });
    } catch (error) {
        // טיפול בשגיאות שעלולות לקרות במהלך ה-DB call
        next({ message: error.message });
    }
};