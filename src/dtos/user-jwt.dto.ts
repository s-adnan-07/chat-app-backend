import { Types } from 'mongoose'

interface UserJwtPayload {
  _id: Types.ObjectId
  username: string
}

export default UserJwtPayload
