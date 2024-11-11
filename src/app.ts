import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv' //dotenv 預設是找.env 檔案
import { setNetwork } from './middleware/setNetwork'
import { errorHandler } from './middleware/errorHandler'
import router from './router/index'
import ConnectionDatabase from '../data_pool/database'
dotenv.config()
require('./webSocket')
const app: Express = express();

// 添加相關網路設置
setNetwork(app)
//連線資料庫
ConnectionDatabase()
// console.log(process.env.POSTGRES_URL)

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