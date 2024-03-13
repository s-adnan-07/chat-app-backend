import { HttpStatus } from '@nestjs/common'
import User from '../models/user.model'
import { Request } from 'express'

/**
 * Function to check whether new email exists in database
 * @param email New email be updated in database
 * @param req Express request object
 */
export const checkExistingEmail = async (email: string, req: Request) => {
  const user = await User.findOne({ email }).select('email').exec()

  if (user) {
    req.statusCode = HttpStatus.FORBIDDEN
    req.statusMessage = 'Update failed - Email already in use'
    throw new Error('Update failed - Email already in use')
  }
}

/**
 * Function to check whether new username exists in database
 * @param username New email be updated in database
 * @param req Express request object
 */
export const checkExistingUserName = async (username: string, req: Request) => {
  const user = await User.findOne({ username }).select('username').exec()

  if (user) {
    req.statusCode = HttpStatus.FORBIDDEN
    req.statusMessage = 'Update failed - Username already in use'
    throw new Error('Update failed - Username already in use')
  }
}
