import 'dotenv/config'

export const JWT_SECRET = process.env.JWT_SECRET || 'My Secret'

export const NODE_ENV = process.env.NODE_ENV || 'development'

export const PORT = NODE_ENV == 'production' ? process.env.PORT : 3000

export const MONGO_URI =
  NODE_ENV == 'production' ? process.env.MONGO_URI : process.env.MONGO_URI_DEV
