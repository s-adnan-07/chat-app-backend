import express from 'express'
import cookieParser from 'cookie-parser'

import connectDB from './config/dB'
import globalErrorHandler from './middlewares/errorHandler'
import authRoutes from './routes/auth.routes'
import messageRoutes from './routes/message.routes'
import UserSocket from './types/ws/UserWebSocket'
import userRoutes from './routes/user.routes'
import wss, { onSocketPreError } from './websocket-server'
import authenticateToken from './auth/authenticateToken'
import { PORT } from './config/constants'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRoutes)
app.use('/messages', messageRoutes)
app.use('/user', userRoutes)
app.get('/', (req, res) => res.send('Hello World'))

// Error handling should be last in the middleware stack
app.use(globalErrorHandler)

const server = app.listen(PORT, async () => {
  await connectDB()
  console.log(`Server listening on port ${PORT}`)
})

server.on('upgrade', (req, socket, head) => {
  socket.on('error', onSocketPreError)

  const user = authenticateToken(req.headers.cookie)

  if (!user) {
    socket.write('Unauthorized')
    socket.destroy()
    return
  }

  wss.handleUpgrade(req, socket, head, (ws: UserSocket) => {
    socket.removeListener('error', onSocketPreError)
    ws.userId = user._id
    ws.userName = user.username

    wss.emit('connection', ws, req)
  })
})
