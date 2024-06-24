import { Request, Response } from 'express';
import Book, { IBook, validateBook } from '../models/bookModel';

export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { error } = validateBook(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { name, description, publishDate, price } = req.body;
    // Check if a book with the same name already exists
    const existingBook = await Book.findOne({ name });
    if (existingBook) {
      res.status(400).json({ message: 'Book with this name already exists' });
      return;
    }
    const newBook: IBook = new Book({ name, description, publishDate, price });
    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error });
  }
};

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, page = '1', limit = '10' } = req.query;

    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const books = await Book.find(searchQuery)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const totalBooks = await Book.estimatedDocumentCount(searchQuery);

    res.status(200).json({ books, totalBooks });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};
