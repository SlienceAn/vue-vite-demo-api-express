import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// 設置白名單
const whiteList = [
    '/login',
    '/register',
]
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    if (whiteList.includes(req.path)) {
        next()
        return
    }
    try {
        const token = req.headers['authorization'] || ''
        jwt.verify(token, process.env.JWT_SECRET as string);
        next()
    } catch (error) {
        res.status(403).json({
            success: false,
            message: '請重新登入驗證身分'
        })
    }
}

export default verifyToken