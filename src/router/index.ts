import { Router } from 'express'
import connectionDatabase from '../../data_pool/database'
import { allUser, addUser, modifyUser, deleteUser, login as loginUser } from './controller/user'

const router = Router()

// 登入
router.post('/login', loginUser)
router.route('/user')
    .get(allUser)
    .post(addUser)
router.route('/user/:id')
    .put(modifyUser)
    .delete(deleteUser)

// table相關操作
router.delete('/table/users', connectionDatabase.dropUserTable)
router.post('/table/users', connectionDatabase.createUserTable)

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