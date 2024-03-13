import mongoose, { Types, Document } from 'mongoose'
import RegisterUser from '../dtos/register-user.dto'

interface UserInterface extends RegisterUser {
  // Timestamps flag in schema will add these fields
  createdAt?: Date
  updatedAt?: Date
}

const UserSchema = new mongoose.Schema<UserInterface>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
  },
  { timestamps: true },
)

export type UserDocument = Document<unknown, {}, UserInterface> &
  UserInterface & { _id: Types.ObjectId }

const User = mongoose.model('user', UserSchema)

export default User
