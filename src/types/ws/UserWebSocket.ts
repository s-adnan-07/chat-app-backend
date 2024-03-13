import { WebSocket } from 'ws'

interface UserSocket extends WebSocket {
  userId: string
  userName: string
}

export default UserSocket
