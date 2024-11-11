import { Router, Request, Response } from 'express'
import { login } from './login'
import { pusher } from '../webSocket/index'
import connectionDatabase from '../../data_pool/database'
import { addUser, modifyUser } from './controller/user'

const router = Router()

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

router.post('/addUser', addUser)
router.put('/modifyUser', modifyUser)
router.delete('/table/drop/users', connectionDatabase.dropUserTable)
router.post('/table/create/users', connectionDatabase.createUserTable)

export default router;