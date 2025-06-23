import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  let status = 500;
  let message = 'Something went wrong';

 
  if (err instanceof Error) {
    message = err.message;
  }

  
  if (typeof err === 'object' && err !== null && 'status' in err) {
    status = (err as { status: number }).status || 500;
  }

  res.status(status).json({
    success: false,
    message,
    error: err,
  });
};