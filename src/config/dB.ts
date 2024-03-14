import mongoose from 'mongoose'
import { MONGO_URI } from './constants'

function handleConnectionErrors(e: unknown) {
  if (e instanceof Error) {
    console.error(e.message)
    return
  }

  console.log(e)
}

/**
 * Function to extablish a connection to mongodb
 */
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
