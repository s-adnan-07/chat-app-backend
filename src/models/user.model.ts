import mongoose, { Types, Document } from 'mongoose'
import RegisterUser from '../dtos/registerUser.dto'

interface UserInterface extends RegisterUser {
  createdAt?: Date
  updatedAt?: Date
}

const UserSchema = new mongoose.Schema<UserInterface>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },

  createdAt: Date,
  updatedAt: Date,
})

export type UserDocument = Document<unknown, {}, UserInterface> &
  UserInterface & { _id: Types.ObjectId }

UserSchema.pre('save', function (next) {
  this.createdAt ??= new Date()
  this.updatedAt = new Date()
  return next()
})

const User = mongoose.model('user', UserSchema)

export default User
