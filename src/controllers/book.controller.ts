import { Request, Response } from 'express';
import Book from '../models/book.model';

// Define query interface
interface BookQuery {
  genre?: string;
}

// Create a new book
export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Validation failed';
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      error: errorMessage,
    });
  }
};

// Get all books with filters, sorting, and limit
export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      filter,
      sortBy = 'createdAt',
      sort = 'asc',
      limit = '10',
    } = req.query;

    const query: BookQuery = {};

    // Filtering by genre
    if (filter) {
      query.genre = filter as string;
    }

    // Parse limit to number
    const limitNumber = parseInt(limit as string, 10);

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(limitNumber);

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error fetching books';
    res.status(500).json({
      success: false,
      message: 'Error fetching books',
      error: errorMessage,
    });
  }
};

// Get book by ID
export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Invalid book ID';
    res.status(400).json({
      success: false,
      message: 'Invalid book ID',
      error: errorMessage,
    });
  }
};

// Update a book
export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId } = req.params;

    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
       res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update book';
    res.status(400).json({
      success: false,
      message: 'Failed to update book',
      error: errorMessage,
    });
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId } = req.params;

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: null,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete book';
    res.status(500).json({
      success: false,
      message: 'Failed to delete book',
      error: errorMessage,
    });
  }
};