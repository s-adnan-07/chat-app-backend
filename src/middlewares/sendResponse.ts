import { HttpStatus } from '@nestjs/common'
import { Response } from 'express'

/**
 * Function to send standard response back to client
 * @example
 * {
 *  statusCode: 200,
 *  message: "Success"
 * }
 *
 * @param statusCode Standard HTTP status code
 * @param message Message to be sent as response
 * @param res Express response object
 */
function sendResponse(
  res: Response,
  statusCode: HttpStatus = HttpStatus.OK,
  message: any = 'Success',
) {
  const responseObject = {
    statusCode,
    message,
  }

  console.log(message)
  res.status(statusCode).send(responseObject)
}

export default sendResponse
