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

export default router;