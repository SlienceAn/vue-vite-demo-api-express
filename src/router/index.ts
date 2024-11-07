import { Router, Request, Response } from 'express'
import { login } from './login'
const router = Router()

router.get('/authTest', (req: Request, res: Response) => {
    res.json({ message: '身分驗證通過' })
})

router.post('/login', login)

export default router;