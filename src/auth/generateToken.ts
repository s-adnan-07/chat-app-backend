import { Response } from 'express'
import jwt from 'jsonwebtoken'
import UserJwtPayload from '../dtos/user-jwt.dto'
import { JWT_SECRET } from '../config/constants'

const FIFTEEN_DAYS = 15
const TWENTY_FOUR_HOURS = 24
const SIXTY_MINUTES = 60
const SIXTY_SECONDS = 60
const THOUSAND_MILLISECONDS = 1000

/**
 * Function to generate jwt from user payload and save it to a cookie in request object
 * @param newUser User jwt payload object to be signed
 * @param res Express response object
 */
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
