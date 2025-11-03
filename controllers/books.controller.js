// הראוטר יכיל את כל הניתובים ששייכים למשאב מסוים
// resource - משאב
// URL - מושפע משם המשאב בד"כ ברבים
// http://localhost:3000/products
//http://localhost:5000/books
//מחזיר את כל הספרים
const getAllBooks =(req, res)=>{//req-לבקש בקשה,res-להחזיר
    res.json(books)
    };
    //http://localhost:5000/books/id
    //מחזיר את כל הספרים
    const getBookById =(req, res)=>{//req-לבקש בקשה,res-להחזיר
    const b=books.find(x=>x.code==req.params.code);
    res.json(b)//מחזיר את הספר
    };
    // method: POST בקשת
    // url: http://localhost:5000/books
    //הוספת ספר
    const addBook =(req, res) => {
        const newBook = {
            code: `B${books.length + 1}`, // קוד אוטומטי
            isBorrowed: false, // ברירת מחדל
            borrowingHistory: [], // ברירת מחדל
            ...req.body //מכניס נתונים..
        };
        books.push(newBook);
    };
    //עידכון
    // method: put בקשת
    // url: http://localhost:5000/books/:code
    const updateBook = (req, res) => {
        const code =req.params.code; // הקוד שמגיע ב־URL
        const { price } = req.body;   // המחיר החדש מבקשת ה־body
        const bookIndex = books.findIndex(book => book.code === code);
        if (bookIndex === -1) {
          return res.status(404).json({ message: 'Book not found' });
        }
        books[bookIndex].price = price; // עדכון המחיר
        // res.send(req.body);
        res.json(books[bookIndex]); // מחזיר את הספר המעודכן
      };
      //השאלת ספר
      // url: http://localhost:5000/books/borrow/:code
      const borrowingabook  =(req, res) => {
        const bookCode = req.query.code;
        const { customerCode } = req.body;
      const bookt = books.findindex(b => b.code === bookCode);
      const book = books[bookt];
      if (bookt === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
      if (books[bookt].isBorrowed) {
        return res.status(400).json({ message: 'Book is currently borrowed and cannot be re-borrowed.'
    })
    };
    // 3. ביצוע ההשאלה: עדכון השדה isBorrowed
    book.isBorrowed = true;
    const today = new Date().toISOString().split('T')[0];
    // 4. עדכון מערך ההשאלות (borrowingHistory)
    book.borrowingHistory.push({
        dateBorrowed: today,
        customerCode: customerCode
    });
    res.json({ message: 'Book successfully borrowed', updatedBook: book });
    };
    // 7. PUT /books/return/:code:ת ספרחזרה
    const  Returningabook  = (req, res) => {
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
    const deleteBook =(req, res) => {
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