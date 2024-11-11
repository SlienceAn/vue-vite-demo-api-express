import { Router } from 'express'
import connectionDatabase from '../../data_pool/database'
import { addUser, modifyUser, login as loginUser } from './controller/user'
// import { pusher } from '../webSocket/index'
// import { login } from './login'

const router = Router()

router.post('/login', loginUser)
router.post('/addUser', addUser)
router.put('/modifyUser', modifyUser)


router.delete('/table/drop/users', connectionDatabase.dropUserTable)
router.post('/table/create/users', connectionDatabase.createUserTable)

// router.post('/ws/test', (req: Request, res: Response) => {
//     console.log('??')
//     try {
//         const socketId = req.body.socket_id;
//         const channel = req.body.channel_name;
//         console.log(socketId)
//         const auth = pusher.authenticateUser(socketId, channel)
//         console.log('auth', auth)
//         res.send(auth)
//     } catch (error) {
//         console.error(error)
//     }
// })
export default router;