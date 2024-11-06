import { Router, Request, Response, NextFunction } from 'express'

const router = Router()

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(403).json({ message: '未提供Token' })
    }
    else next()
}

router.get('/test', verifyToken, (req: Request, res: Response) => {
    res.json({ message: 'test api' })
})

router.get('/list', (req: Request, res: Response) => {
    res.json({
        id: 'A',
        message: 'BMC'
    })
})


export default router;