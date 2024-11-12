import express, { Application } from 'express';
import dotenv from 'dotenv' //dotenv 預設是找.env 檔案
import { setNetwork } from './middleware/setNetwork'
import { setClient } from './middleware/setClient'
import { errorHandler } from './middleware/errorHandler'
import router from './router/index'
import ConnectionDatabase from '../data_pool/database'
// import Pusher from './webSocket'
dotenv.config()

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