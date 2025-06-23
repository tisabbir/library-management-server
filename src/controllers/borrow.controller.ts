import { Request, Response } from 'express';
import Borrow from '../models/borrow.model';
import Book from '../models/book.model';

export const borrowBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
      return; // ✅ Prevent further execution
    }

    if (book.copies < quantity) {
      res.status(400).json({
        success: false,
        message: 'Not enough copies available',
      });
      return; // ✅ Prevent further execution
    }

    // ✅ TypeScript knows `book` is not null here
    book.copies -= quantity;
    await book.updateAvailability(); // ✅ Assuming this method is in your Book model

    const borrow = await Borrow.create({
      book: bookId,
      quantity,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({
      success: false,
      message: 'Failed to borrow book',
      error: errorMessage,
    });
  }
};

export const borrowedBooksSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books', // MongoDB collection name
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails',
        },
      },
      {
        $unwind: '$bookDetails',
      },
      {
        $project: {
          book: {
            title: '$bookDetails.title',
            isbn: '$bookDetails.isbn',
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: result,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve summary',
      error: errorMessage,
    });
  }
};