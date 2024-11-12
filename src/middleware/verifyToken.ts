import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// 設置白名單
const whiteList = [
    '/',
    '/favicon.ico',
    '/login',
    '/register',
]
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'] || ''
    if (whiteList.includes(req.path)) {
        next()
        return
    }
    if (!token) {
        res.status(401).json({
            success: false,
            message: '驗證未提供'
        })
        return
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET as string);
        next()
    } catch (error) {
        res.status(403).json({
            success: false,
            message: '驗證身分錯誤'
        })
    }
}

export default verifyToken