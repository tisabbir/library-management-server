import { Request, Response } from 'express';
import Book from '../models/book.model';

// Create a new book
export const createBook = async (req: Request, res: Response) => {
    try {
      const book = await Book.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: book
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        error
      });
    }
  };

// Get all books with filters, sorting, limit
export const getBooks = async (req: Request, res: Response) => {
  try {
    const {
      filter,            
      sortBy = 'createdAt',
      sort = 'asc',
      limit = '10'
    } = req.query;

    const query: any = {};

    // Filtering by genre
    if (filter) {
      query.genre = filter;
    }

    // Parsing limit to number
    const limitNumber = parseInt(limit as string, 10);

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(limitNumber);

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching books',
      error: error
    });
  }
};

// Get book by ID
export const getBookById = async (req: Request, res: Response) => {
    try {
      const { bookId } = req.params;
  
      const book = await Book.findById(bookId);
  
      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Book not found'
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Book retrieved successfully',
        data: book
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Invalid book ID',
        error: error.message || error
      });
    }
  };

// Update a book
export const updateBook = async (req: Request, res: Response) => {
    try {
      const { bookId } = req.params;
  
      const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!updatedBook) {
        return res.status(404).json({
          success: false,
          message: 'Book not found'
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Book updated successfully',
        data: updatedBook
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Failed to update book',
        error: error.message || error
      });
    }
  };

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
    try {
      const { bookId } = req.params;
  
      const deletedBook = await Book.findByIdAndDelete(bookId);
  
      if (!deletedBook) {
        return res.status(404).json({
          success: false,
          message: 'Book not found',
          data: null
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Book deleted successfully',
        data: null
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete book',
        error: error.message || error
      });
    }
  };