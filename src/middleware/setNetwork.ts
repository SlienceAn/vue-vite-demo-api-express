import express, { Application } from "express"
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit';
import verifyToken from '../middleware/verifyToken';

export const setNetwork = (app: Application) => {

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    // Helmet 設定( 包含CSP )
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"], // 'self' 表示只允許來自相同域名的資源

                // 控制 JavaScript 的來源
                scriptSrc: [
                    "'self'",           // 允許來自相同域名的腳本
                    "'unsafe-inline'",  // 允許內聯腳本（如 <script> 標籤內的代碼）
                    "blob:"            // 允許 blob URL 的腳本執行
                ],
                // 控制 CSS 的來源
                styleSrc: [
                    "'self'",           // 允許來自相同域名的樣式
                    "'unsafe-inline'"   // 允許內聯樣式（如 <style> 標籤或 style 屬性）
                ],
                // 控制字體檔案的來源
                fontSrc: [
                    "'self'",                    // 允許來自相同域名的字體
                    "data:",                     // 允許 data URI 的字體
                    "https://fonts.gstatic.com"  // 允許從 Google Fonts 載入字體
                ],
                // 控制圖片的來源
                imgSrc: [
                    "'self'",  // 允許來自相同域名的圖片
                    "data:",   // 允許 data URI 的圖片
                    "https:"   // 允許所有 HTTPS 來源的圖片
                ],
                // 控制 AJAX、WebSocket 或 EventSource 的連接
                connectSrc: [
                    "'self'",  // 允許連接到相同域名
                    "ws:",     // 允許 WebSocket 連接
                    "wss:"     // 允許安全的 WebSocket 連接
                ],
                frameSrc: ["'self'"],
                // 控制 <object>、<embed> 和 <applet> 的來源
                objectSrc: ["'none'"] // 完全禁止這些標籤（增加安全性）
            }
        }
    }))
    //禁用 X-Powered-By
    app.use(helmet.hidePoweredBy())

    const origin = process.env.NODE_ENV === 'development' ?
        ['http://localhost:6969', 'http://localhost:3001'] :
        ['https://vue-vite-demo-api-express.vercel.app']

    // CORS 配置
    app.use(cors({
        origin,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
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

    // 檢查是否在 Vercel 環境
    const isVercel = process.env.VERCEL || false;

    // 根據環境設置 trust proxy
    if (isVercel) {
        app.set('trust proxy', 1);
    }
}