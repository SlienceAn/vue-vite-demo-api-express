import express, { Express } from "express"
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit';
import verifyToken from '../middleware/verifyToken';

export const setNetwork = (app: Express) => {

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet())
    //禁用 X-Powered-By
    app.use(helmet.hidePoweredBy())
    // CORS 配置
    app.use(cors({
        origin: ['http://localhost:6969'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }))
    // 限制請求數量
    app.use(rateLimit({
        windowMs: 5 * 60 * 1000,
        max: 20
    }))

    // 設置大小限制
    app.use(express.json({ limit: '10mb' }))
    //驗證token
    app.use(verifyToken)
}