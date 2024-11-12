import Pusher from 'pusher'

export default new Pusher({
    appId: process.env.PUSHER_APPID!,
    key: process.env.PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.PUSHER_CLUSTER!
})
// setInterval(() => {
//     const val = Math.random();
//     pusher.trigger('my-channel', 'message', {
//         message: `來自後端的祝福,API的攻擊力提升${val}%`
//     })
// }, 5000)

