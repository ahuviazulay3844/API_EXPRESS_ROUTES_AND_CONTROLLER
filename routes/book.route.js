
import { Router } from "express";
const router = Router();

// method: GET בקשת
// url: http://localhost:3000/Books?page=2&limit=5&name=nnn
router.get('/', getAllBooks);

// method: GET בקשת
// url: http://localhost:3000/Books/111
router.get('/:id', getBookById);

// method: POST בקשת
// url: http://localhost:3000/Books
router.post('/', addBook);

router.put('/:id', updateBook);

router.delete('/:id', deleteBook);
router.put('/borrow/:code',borrowingabook);
router.put('/books/return/:code',Returningabook);


export default router;