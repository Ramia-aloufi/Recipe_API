import { Response } from "express";

export interface ApiResponse<T> {
  statusCode:number
  message: string | {}
  data?: T
  meta?: PaginationMeta;
}

interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const successResponse = <T>(
  res: Response, payload:ApiResponse<T>

) => {
  var {message, data, meta, statusCode} = payload  
   res.status(statusCode || 200).json({
    status : true,
    message,
    data,
    meta,
  })
}

export const errorResponse = <T>(
  res: Response,
  payload:ApiResponse<T>
) => {
  var {message, statusCode} = payload
   res.status(statusCode || 500).json({
    status:false,
    message,
    data:null,
    meta:null
  })
}
