import { Response } from "express";

interface ApiResponse<T> {
  status: string;
  message: string;
  data?: T;
  errors?: any[];
  meta?: PaginationMeta; 
}

interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
}

export const successResponse = <T>(
  res: Response,
  message: string,
  data?: T,
  meta?: PaginationMeta
) => {
  return res.status(200).json({
    status: "success",
    message,
    data,
    meta,
    errors: null,
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  errors: any[] = [],
  statusCode: number = 400
) => {
  return res.status(statusCode).json({
    status: "error",
    message,
    data: null,
    errors,
  });
};
