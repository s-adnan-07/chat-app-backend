import express from 'express'
import {
  getMessages,
  receiverId,
  sendMessage,
} from '../controllers/message.controller'
import expressAsyncHandler from 'express-async-handler'
import protectRoute from '../middlewares/protectRoute'

const messageRoutes = express.Router()

messageRoutes.get(
  `/:${receiverId}`,
  expressAsyncHandler(protectRoute),
  expressAsyncHandler(getMessages),
)

messageRoutes.post(
  `/send/:${receiverId}`,
  expressAsyncHandler(protectRoute),
  expressAsyncHandler(sendMessage),
)

export default messageRoutes
