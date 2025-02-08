import { Router, Request, Response } from 'express'
import connectionDatabase from '../../data_pool/database'
import { allUser, addUser, modifyUser, deleteUser } from './controller/user'
import { loginOut, login as loginUser, testCICD } from './controller/login'
import { device } from './controller/device'
import { city } from './controller/city'
import { info } from './controller/info'
import { search } from './controller/search'
import axios from 'axios'

const router = Router()

// 登入
router.post('/login', loginUser)
router.post('/loginOut', loginOut)
router.route('/user')
    .get(allUser)
    .post(addUser)
router.route('/user/:id')
    .put(modifyUser)
    .delete(deleteUser)

router.get('/city', city)
router.get('/device', device)
router.get('/info', info)
router.get('/search', search)
router.get('/testCICD', testCICD)

// ollama 測試
router.get('/ollama', async (req: Request, res: Response) => {
    // 设置 SSE 相关的响应头
    res.setHeader("Content-Type", "text/event-stream;charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*"); // 允许跨域

    const { prompt } = req.query
    console.log(prompt)

    const data = await axios.post('http://localhost:11434/api/generate', {
        model: 'tinyllama',
        prompt,
        stream: true,
        max_tokens: 40,
        // temperature: 0.3,
        // frequency_penalty: 0.5,  降低重複內容的可能性
    }, {
        responseType: 'stream'
    })

    let textCollection = ''
    data.data.on('data', (chunk: Buffer) => {
        const base = chunk.toString('utf-8')
        const lines = base.split('\n').filter(line => line.trim())
        const text = JSON.parse(lines[0])
        textCollection += text.response
        res.write(`data: ${text.response}\n\n`)

    })
    data.data.on('end', () => {
        console.log(textCollection)
    })
    data.data.on('error', (error: any) => {
        console.log(error)
    })
})

// table相關操作
router.delete('/table/users', connectionDatabase.dropUserTable)
router.post('/table/users', connectionDatabase.createUserTable)

export default router;