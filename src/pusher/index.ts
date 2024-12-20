import dotenv from 'dotenv'
import Pusher from 'pusher'

dotenv.config()

if (!process.env.PUSHER_APPID || !process.env.PUSHER_KEY || !process.env.PUSHER_SECRET || !process.env.PUSHER_CLUSTER) {
    throw new Error('Missing required Pusher environment variables')
}
const pusherConfig = {
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER
}

export default new Pusher(pusherConfig)


