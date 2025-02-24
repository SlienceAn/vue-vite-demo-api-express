import { Request, Response } from 'express'
import pusher from "."

export const pusherAuth = (req: Request, res: Response) => {
    const { socket_id, channel_name } = req.body
    const auth = pusher.authorizeChannel(socket_id,channel_name)
    res.send(auth)    
}