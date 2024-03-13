import { HttpStatus } from '@nestjs/common'
import { NextFunction, Request, Response, ErrorRequestHandler } from 'express'

/**
 * Custom error handling middleware function that logs errors to the console and sends user readable response
 * @param err Error object thrown by the application
 * @param req Express request object
 * @param res Express response object
 * @param next Next function in middleware stack
 */
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err)

  const statusCode = req.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
  const error = req.statusMessage || 'Internal Server Error'
  const responseObject = {
    statusCode,
    error,
  }

  res.status(statusCode).send(responseObject)
}

export default globalErrorHandler
