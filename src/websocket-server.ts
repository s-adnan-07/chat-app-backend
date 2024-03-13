import ws, { WebSocketServer } from 'ws'
import UserSocket from './types/ws/UserWebSocket'

export const onSocketPreError = (e: Error) => {
  console.log(e)
}

export const onSocketPostError = (e: Error) => {
  console.log(e)
}

const wss = new WebSocketServer({ noServer: true })

wss.on('connection', (ws: UserSocket) => {
  console.log(`User '${ws.userName}' connected`)

  ws.on('error', onSocketPostError)
  ws.on('close', () => console.log(`User '${ws.userName}' disconnected`))
})

/**
 * Function to send real-time message to receiver.
 * @param message Message to be sent to the receiving client
 * @param receiverId Mongo document id of the client
 */
export const sendSocketMessage = (message: string, receiverId: string) => {
  wss.clients.forEach((client: UserSocket) => {
    if (client.userId === receiverId && client.readyState === ws.OPEN)
      client.send(message)
  })
}

export default wss
