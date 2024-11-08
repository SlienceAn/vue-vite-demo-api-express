import express, { Express, Request, Response, NextFunction } from 'express';
require('dotenv').config()
require('./webSocket')
import { setNetwork } from './middleware/setNetwork'
import { errorHandler } from './middleware/errorHandler'
import router from './router/index'
const app: Express = express();

// 添加相關網路設置
setNetwork(app)

// 添加路由
app.use('/', router)

app.get('/', (req: Request, res: Response) => {
    res.send('WELCOME TO THE BASIC EXPRESS APP');
});

// 錯誤處理中間件
app.use(errorHandler);

if (process.env.NODE_ENV === 'development') {
    if (process.env.PORT) {
        app.listen(parseInt(process.env.PORT), '0.0.0.0', () => console.log('Server is running'));
    }
}

export default app;