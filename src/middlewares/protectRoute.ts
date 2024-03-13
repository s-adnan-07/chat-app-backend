import { HttpStatus } from '@nestjs/common'
import { RequestHandler } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import 'dotenv/config'
import { MessageParams } from '../controllers/message.controller'
import ChatMessage from '../dtos/chat-message.dto'
import User from '../models/user.model'

// This middleware needs to hace same generic type arguments as the controller it is protecting
const protectRoute: RequestHandler<MessageParams, {}, ChatMessage> = async (
  req,
  res,
  next,
) => {
  const token = req.cookies.jwt

  if (!token) {
    req.statusCode = HttpStatus.UNAUTHORIZED
    req.statusMessage = 'Unauthorized - No Token Provided'
    throw new Error('Unauthorized - No Token Provided')
  }

  try {
    // Invalid Tokens Throw error 'invalid signature'
    // Hence decoded will not be undefined
    const { _id } = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload
    const user = await User.findById(_id).select('-password').exec()

    if (!user) {
      req.statusCode = HttpStatus.NOT_FOUND
      req.statusMessage = 'User does not exist'
      throw new Error('User does not exist')
    }

    req.user = user

    next()
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      req.statusCode = HttpStatus.UNAUTHORIZED
      req.statusMessage = 'Unauthorized - Invalid Token'
    }

    throw err
  }
}

export default protectRoute
