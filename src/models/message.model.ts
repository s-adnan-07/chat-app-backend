import mongoose, { Document, Types } from 'mongoose'
import ChatMessage from '../dtos/chat-message.dto'

interface MessageInterface extends ChatMessage {
  senderId: Types.ObjectId
  receiverId: Types.ObjectId

  createdAt?: Date
  updatedAt?: Date
}

const MessageSchema = new mongoose.Schema<MessageInterface>(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export type MessageDocument = Document<unknown, {}, MessageInterface> &
  MessageInterface & { _id: Types.ObjectId }

const Message = mongoose.model('message', MessageSchema)

export default Message
