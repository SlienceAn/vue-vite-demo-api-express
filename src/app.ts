import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit';
import router from './router'
const app: Express = express();
// const port = process.env.PORT || 3000;


// 中間件
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
app.use('/', router)

// 路由
app.get('/', (req: Request, res: Response) => {
    res.send('WELCOME TO THE BASIC EXPRESS APP');
});


// 錯誤處理中間件
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Something broke!'
    });
});

app.listen(3001, () => console.log('Server is running'));

export default app;