
export interface CustomError extends Error {
    statusCode?: number
    messages? : string |{}
  }

  export const createError = (statusCode:number, message:string | {}) => {    
    const error = new Error() as CustomError;
    error.statusCode = statusCode;
    error.messages = message
    return error;
}