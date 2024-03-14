import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/constants'

/**
 * Function to verify the token integrity during a websocket connection
 * @param token JWT that is stored in the cookie
 * @returns User jwt payload if successfully verified
 * @throws Invalid signature error if the token verification fails
 */
function authenticateToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload
  } catch (err) {
    return false
  }
}

export default authenticateToken
