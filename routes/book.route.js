
import { Router } from "express";
import { getAllBooks,getBookById,Returningabook,borrowingabook,deleteBook,updateBook,addBook } from "../controllers/books.controller.js";
import { joiValidator } from "../middlewares/joi-validator.middleware.js"; 
import { validateUseBooks } from "../models/books.model.js";

const router = Router();

// method: GET בקשת
// url: http://localhost:3000/Books?page=2&limit=5&name=nnn
router.get('/', getAllBooks);

// method: GET בקשת
// url: http://localhost:3000/Books/111
router.get('/:id', getBookById);

// method: POST בקשת
// url: http://localhost:3000/Books
router.post('/', joiValidator(validateUseBooks.addBook), addBook);
router.put('/:id', joiValidator(validateUseBooks.updateBook), updateBook);
router.delete('/:id', deleteBook);
router.put('/borrow/:code', joiValidator(validateUseBooks.borrowBook), borrowingabook);
router.put('/return/:code',Returningabook);


export default router;