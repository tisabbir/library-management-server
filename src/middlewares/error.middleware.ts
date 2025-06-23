import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || 'Something went wrong',
    error: err
  });
};