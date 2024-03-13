import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { updateUser, viewUser } from '../controllers/user.controller'
import protectRoute from '../middlewares/protectRoute'

const userRoutes = express.Router()

userRoutes.get('/', expressAsyncHandler(protectRoute), viewUser)

userRoutes.post(
  '/',
  expressAsyncHandler(protectRoute),
  expressAsyncHandler(updateUser),
)

export default userRoutes
