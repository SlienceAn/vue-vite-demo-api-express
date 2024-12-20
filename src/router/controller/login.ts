import { Request, Response } from 'express'
import { createKysely } from '@vercel/postgres-kysely'
import dataPool from '@data/index'
import jwt from 'jsonwebtoken'
import { triggerNotification } from '@/pusher/trigger'

let newsInterval: ReturnType<typeof setInterval>;
let warningInterval: ReturnType<typeof setInterval>;

export const login = async (req: Request, res: Response) => {
    const { account: acc, password: psw } = req.body
    try {
        const db = createKysely<UserTableColumn>()
        const users = await db
            .selectFrom('users')
            .select(['id', 'account', 'username', 'menu'])
            .where('account', '=', acc)
            .where('password', '=', psw)
            .executeTakeFirst() // 只返回第一筆資料
        if (!users) {
            res.status(401).json({
                success: false,
                message: '查無此帳號'
            })
            return
        } else {
            const { routerList } = dataPool //寫死的路由資料
            const menu: any = []
            // 產生JWT Token
            const token = jwt.sign(
                users,
                process.env.JWT_SECRET as string,
                { expiresIn: parseInt(process.env.JWT_EXPIRE!) }
            )
            if (Array.isArray(users.menu)) {
                users.menu.forEach((el: number) => menu.push(routerList[el - 1]))
            }
            res.status(200).json({
                token,
                success: true,
                isPremission: true,
                message: '登入成功',
                usersname: users.username,
                menu
            })
            newsInterval = setInterval(() => triggerNotification('news'), 5000)
            warningInterval = setInterval(() => triggerNotification('warning'), 10000)
        }
    } catch (error) {
        res.status(401).json({
            success: false,
            message: '登入失敗'
        })
    }
}
export const loginOut = (req: Request, res: Response) => {
    clearInterval(newsInterval)
    clearInterval(warningInterval)
    res.status(200).json({
        success: false,
        message: '登出成功'
    })
}