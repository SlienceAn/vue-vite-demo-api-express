import express, { Application } from 'express';
import dotenv from 'dotenv' //dotenv 預設是找.env 檔案
import { setNetwork } from './middleware/setNetwork'
import { setClient } from './middleware/setClient'
import { errorHandler } from './middleware/errorHandler'
import ConnectionDatabase from '../data_pool/database'
import { routeSetup } from './router/routeFactory'
dotenv.config()

const app: Application = express();
const routers = express.Router()

routeSetup(routers)

setClient(app)
setNetwork(app)

ConnectionDatabase()

// app.use('/', router)
app.use('/',routers)
app.use(errorHandler);

if (process.env.NODE_ENV === 'development') {
    if (process.env.PORT) {
        app.listen(parseInt(process.env.PORT), '0.0.0.0', () => console.log('Server is running'));
    }
}

export default app;