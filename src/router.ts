import { Router, Request, Response, NextFunction } from 'express'

const router = Router()

const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
    console.log(req.headers)
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: '未提供Token' })
    else next()
}

router.get('/test', (req: Request, res: Response) => {
    res.json({ message: 'test api' })
})

router.get('/list', verifyToken, (req: Request, res: Response) => {
    res.json({
        id: 'A',
        message: 'BMC'
    })
})


export default router;