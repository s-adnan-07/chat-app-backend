import jwt from 'jsonwebtoken'
import 'dotenv/config'

const JWT_SECRET = process.env.JWT_SECRET

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
