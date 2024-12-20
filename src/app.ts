import 'module-alias/register' // 模塊別名(before any code )
import dotenv from 'dotenv' //dotenv 預設是找.env 檔案
dotenv.config()
import express, { Application } from 'express';
import './type'
import ConnectionDatabase from '@data/database'
import { setNetwork } from './middleware/setNetwork'
import { setClient } from './middleware/setClient'
import { errorHandler } from './middleware/errorHandler'
import router from './router/index'

const app: Application = express();

setClient(app)
setNetwork(app)
ConnectionDatabase()

app.use('/', router)
app.use(errorHandler);

if (process.env.NODE_ENV === 'development') {
    if (process.env.PORT) {
        app.listen(parseInt(process.env.PORT), '0.0.0.0', () => console.log('Server is running'));
    }
}

export default app;