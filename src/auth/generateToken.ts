import { Response } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import UserJwtPayload from '../dtos/user-jwt.dto'

const JWT_SECRET = process.env.JWT_SECRET || 'MySecret'

const FIFTEEN_DAYS = 15
const TWENTY_FOUR_HOURS = 24
const SIXTY_MINUTES = 60
const SIXTY_SECONDS = 60
const THOUSAND_MILLISECONDS = 1000

function generateToken(newUser: UserJwtPayload, res: Response) {
  const token = jwt.sign(newUser, JWT_SECRET, { expiresIn: '15d' })

  const maxAgeInMilliseconds =
    FIFTEEN_DAYS *
    TWENTY_FOUR_HOURS *
    SIXTY_MINUTES *
    SIXTY_SECONDS *
    THOUSAND_MILLISECONDS

  res.cookie('jwt', token, {
    maxAge: maxAgeInMilliseconds,
    httpOnly: true,
    sameSite: 'strict',
  })
}

export default generateToken
