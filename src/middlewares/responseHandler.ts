import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Response {
      success: (message: string, data?: any, total_data?: number) => void;
      created: (message: string, data?: any) => void;
    }
  }
}

export const responseHandler = (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  res.success = (
    message: string = "Success",
    data: any,
    total_data?: number
  ) => {
    res.json({
      success: true,
      status: res.statusCode,
      message,
      total_data,
      data,
    });
  };

  res.created = (message: string = "Created", data: any) => {
    res.status(201).json({
      success: true,
      status: res.statusCode,
      message,
      data,
    });
  };

  next();
};
