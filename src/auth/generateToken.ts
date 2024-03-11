import { Response } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const JWT_SECRET = process.env.JWT_SECRET || 'MySecret'

const FIFTEEN_DAYS = 15
const TWENTY_FOUR_HOURS = 24
const SIXTY_MINUTES = 60
const SIXTY_SECONDS = 60
const THOUSAND_MILLISECONDS = 1000

function generateToken(username: string, res: Response) {
  const token = jwt.sign({ userId: username }, JWT_SECRET, { expiresIn: '15d' })

  const maxAgeInMilliseconds =
    FIFTEEN_DAYS *
    TWENTY_FOUR_HOURS *
    SIXTY_MINUTES *
    SIXTY_SECONDS *
    THOUSAND_MILLISECONDS

  res.cookie('jwt', token, {
    maxAge: maxAgeInMilliseconds,
    httpOnly: true, // So cookie cant be accessed via javascript
    sameSite: 'strict',
  })
}

export default generateToken
