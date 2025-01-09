import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Response {
      success: (message: string, data?: any, total_data?: number) => void;
      paginated: (
        message: string,
        data: any,
        count: number,
        total_data: number,
        page: number,
        limit: number
      ) => void;
      created: (message: string, data?: any) => void;
      error: (message: string, data?: any) => void;
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

  res.paginated = (
    message: string = "Success",
    data: any,
    count: number,
    total_data: number,
    page: number,
    limit: number
  ) => {
    res.json({
      success: true,
      status: res.statusCode,
      message,
      metadata: {
        total_data,
        total_page: Math.ceil(total_data / limit),
        current_page: page,
        limit,
        count,
      },
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

  res.error = (message: string = "Error", data: any) => {
    res.json({
      success: false,
      status: 400,
      message,
      data,
    });
  };

  next();
};
