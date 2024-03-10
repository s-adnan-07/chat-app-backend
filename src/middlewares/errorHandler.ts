import { NextFunction, Request, Response } from 'express'

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err)

  const statusCode = req.statusCode || 500
  const error = err.message ?? 'Internal Server Error'
  const responseObject = {
    statusCode,
    errorMsg: error,
  }

  res.status(statusCode).send(responseObject)
}

export default errorHandler
