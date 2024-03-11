import { HttpStatus } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err)

  const statusCode = req.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
  const error = req.statusMessage || 'Internal Server Error'
  const responseObject = {
    statusCode,
    error,
  }

  res.status(statusCode).send(responseObject)
}

export default errorHandler
