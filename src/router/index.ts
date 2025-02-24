import { Router } from 'express'
import connectionDatabase from '../../data_pool/database'
import { allUser, addUser, modifyUser, deleteUser } from './controller/user'
import { loginOut, login as loginUser } from './controller/login'
import { device } from './controller/device'
import { city } from './controller/city'
import { info } from './controller/info'
import { search } from './controller/search'
import { pusherAuth } from '../pusher/auth'
const router = Router()

// 登入
router.post('/login', loginUser)
router.post('/loginOut', loginOut)
router.route('/user')
    .get(allUser)
    .post(addUser)
router.route('/user/:id')
    .put(modifyUser)
    .delete(deleteUser)


router.get('/city', city)
router.get('/device', device)
router.get('/info', info)
router.get('/search', search)

// webSocket pusher 驗證
router.post('/pusher/auth', pusherAuth)

// table相關操作
router.delete('/table/users', connectionDatabase.dropUserTable)
router.post('/table/users', connectionDatabase.createUserTable)

export default router;