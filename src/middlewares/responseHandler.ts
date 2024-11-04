import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Response {
      success: (message: string, data?: any, refresh_token?: string) => void;
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
    refresh_token?: string
  ) => {
    res.setHeader("Refresh-Token", refresh_token || "");
    res.setHeader("Access-Control-Expose-Headers", "Refresh-Token");
    res.json({
      success: true,
      status: res.statusCode,
      message,
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
