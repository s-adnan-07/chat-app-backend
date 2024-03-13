import mongoose from 'mongoose'
import { RequestHandler } from 'express'
import { HttpStatus } from '@nestjs/common'
import ChatMessage from '../dtos/chat-message.dto'
import Conversation from '../models/conversation.model'
import Message from '../models/message.model'
import { sendSocketMessage } from '../server'

export interface MessageParams {
  id: string
}

export const receiverId = 'id'

// Assuming message Data validation is performed in front end
export const sendMessage: RequestHandler<
  MessageParams,
  {},
  ChatMessage
> = async (req, res) => {
  const { message } = req.body
  const { id } = req.params
  const senderId = req.user._id
  const receiverId = new mongoose.Types.ObjectId(id)

  // find Existing conversation between these two people
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  }).exec()

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    })
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  })

  conversation.messages.push(newMessage._id)
  await Promise.all([conversation.save(), newMessage.save()])

  // console.log('message sent', req.params.id)
  // sendResponse(res)
  // res.status(HttpStatus.CREATED).json(newMessage)

  // Send message to other user
  sendSocketMessage(message, id)
  res.status(HttpStatus.CREATED).json(newMessage)
}

export const getMessages: RequestHandler<MessageParams> = async (req, res) => {
  const { id } = req.params
  const senderId = req.user._id
  const userToChatId = new mongoose.Types.ObjectId(id)

  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, userToChatId] },
  })
    .populate('messages')
    .exec()

  const messages = conversation?.messages || []

  res.status(HttpStatus.OK).send(messages)
}
