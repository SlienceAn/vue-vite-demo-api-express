import { Router, Request, Response } from 'express'
import { login } from './login'
import jwt from 'jsonwebtoken'
import { pusher } from '../webSocket/index'

const router = Router()

router.get('/authTest', (req: Request, res: Response) => {
    res.json({ message: '身分驗證通過' })
})

router.post('/login', login)
router.post('/ws/test', (req: Request, res: Response) => {
    console.log('??')
    try {
        const socketId = req.body.socket_id;
        const channel = req.body.channel_name;
        console.log(socketId)
        const auth = pusher.authenticateUser(socketId, channel)
        console.log('auth', auth)
        res.send(auth)
    } catch (error) {
        console.error(error)
    }

})

export default router;