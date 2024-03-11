import { RequestHandler } from 'express'
import { HttpStatus } from '@nestjs/common'
import RegisterUser from '../dtos/register-user.dto'
import User from '../models/user.model'
import LoginUser from '../dtos/login-user.dto'
import generateToken from '../auth/generateToken'
import sendResponse from '../middlewares/sendResponse'

// Assuming password and confirm password is handled in fornt end
export const register: RequestHandler<{}, {}, RegisterUser> = async (
  req,
  res,
) => {
  const { username, email } = req.body

  // Need to add validation logic or middleware to check integrity of incoming data

  const user = await User.findOne({ email }).exec()
  if (user) {
    req.statusCode = HttpStatus.FORBIDDEN
    req.statusMessage = 'User exists'
    throw new Error(
      `User creation failed, user '${user.username}' exists in database`,
    )
  }

  const newUser = new User(req.body)
  await newUser.save()

  sendResponse(
    res,
    HttpStatus.CREATED,
    `User '${username}' created in database`,
  )
}

export const login: RequestHandler<{}, {}, LoginUser> = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).exec()
  const passwordsMatch = password === user?.password

  if (!user || !passwordsMatch) {
    req.statusCode = HttpStatus.UNAUTHORIZED
    throw new Error('Invalid email or password')
  }

  generateToken(user.username, res)
  sendResponse(res, HttpStatus.OK, `Welcome ${user.username}`)
}

export const logout: RequestHandler = (req, res) => {
  res.cookie('jwt', '', { maxAge: 0 })
  sendResponse(res, HttpStatus.OK, 'Logged out successfully')
}
