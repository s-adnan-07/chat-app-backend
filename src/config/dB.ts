import mongoose from 'mongoose'
import 'dotenv/config'

const MONGO_URI = process.env.MONGO_URI

function handleConnectionErrors(e: unknown) {
  if (e instanceof Error) {
    console.error(e.message)
    return
  }

  console.log(e)
}

async function connectDB() {
  try {
    if (!MONGO_URI) throw new Error('No Connection URI defined')

    await mongoose.connect(MONGO_URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.error(`Error connecting to mongoDB`)
    handleConnectionErrors(error)
  }
}

export default connectDB
