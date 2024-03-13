import { HttpStatus } from '@nestjs/common'
import User from '../models/user.model'
import { Request } from 'express'

export const checkExistingEmail = async (email: string, req: Request) => {
  const user = await User.findOne({ email }).select('email').exec()

  if (user) {
    req.statusCode = HttpStatus.FORBIDDEN
    req.statusMessage = 'Update failed - Email already in use'
    throw new Error('Update failed - Email already in use')
  }
}

export const checkExistingUserName = async (username: string, req: Request) => {
  const user = await User.findOne({ username }).select('username').exec()

  if (user) {
    req.statusCode = HttpStatus.FORBIDDEN
    req.statusMessage = 'Update failed - Username already in use'
    throw new Error('Update failed - Username already in use')
  }
}
