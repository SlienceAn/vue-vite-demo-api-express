import { Router } from 'express'
import connectionDatabase from '../../data_pool/database'

const router = Router()


// table相關操作
router.delete('/table/users', connectionDatabase.dropUserTable)
router.post('/table/users', connectionDatabase.createUserTable)

export default router;