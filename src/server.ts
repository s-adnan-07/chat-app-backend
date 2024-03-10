import express from 'express'
import 'dotenv/config'
import authRoutes from './routes/auth.routes'
import connectDB from './config/dB'
import errorHandler from './middlewares/errorHandler'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use('/auth', authRoutes)
app.get('/', (req, res) => res.send('Hello World'))

// Error handling should be last in the middleware stack
app.use(errorHandler)

app.listen(PORT, async () => {
  await connectDB()
  console.log(`Server listening on port ${PORT}`)
})
