// src/app.ts
import express, { Express, Request, Response, NextFunction, Router } from 'express';

const app: Express = express();
const port = process.env.PORT || 3000;
const router = Router()

// 中間件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Express + TypeScript Server' });
});


// 錯誤處理中間件
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Something broke!'
    });
});

app.get('/user', (req: Request, res: Response) => {
    res.status(200).json({
        a: 'cccc',
        b: 'dddd'
    })
})

// 啟動服務器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export default app;