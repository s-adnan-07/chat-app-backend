import mongoose, { Types, Document } from 'mongoose'

interface ConversationInterface {
  participants: Types.ObjectId[]
  messages: Types.ObjectId[]

  createdAt?: Date
  updatedAt?: Date
}

const ConversationSchema = new mongoose.Schema<ConversationInterface>(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],

    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // Ref has to be lower case or mongoose throws error that schema isn't registered for model
        ref: 'message',
        default: [],
      },
    ],
  },
  { timestamps: true },
)

export type MessageDocument = Document<unknown, {}, ConversationInterface> &
  ConversationInterface & { _id: Types.ObjectId }

const Conversation = mongoose.model('conversation', ConversationSchema)

export default Conversation
