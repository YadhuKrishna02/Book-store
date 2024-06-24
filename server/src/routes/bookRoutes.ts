import { Router } from 'express';
import { createBook, getBooks } from '../controllers/bookController';
import auth from '../middleware/authMiddleware';
const router: Router = Router();

router.post('/add-book', auth, createBook);
router.get('/list-books', auth, getBooks);

export default router;
