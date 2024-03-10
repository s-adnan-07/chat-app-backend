import { RequestHandler } from 'express'
import RegisterUser from '../dtos/registerUser.dto'
import User from '../models/user.model'

// Assuming password and confirm password is handled in fornt end
export const register: RequestHandler<{}, {}, RegisterUser> = async (
  req,
  res,
) => {
  const { username, email, password, fullname } = req.body

  // Need to add validation logic or middleware to check integrity of incoming data

  const user = await User.findOne({ username }).exec()
  if (user) {
    req.statusCode = 400
    throw new Error('user exists')
  }

  const newUser = new User(req.body)
  await newUser.save()

  res.status(201).send('User created in database')
}

export const login: RequestHandler = (req, res) => {
  res.send('Login Route')
}
