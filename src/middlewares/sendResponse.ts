import { HttpStatus } from '@nestjs/common'
import { Response } from 'express'

/**
 * Function to send standard one-line response back to client
 * @param statusCode Standard HTTP status code
 * @param message Message to be sent as response
 * @param res Response object
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

  res.status(statusCode).send(responseObject)
}

export default sendResponse
