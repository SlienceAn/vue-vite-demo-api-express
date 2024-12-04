import { Request, Response } from 'express'
import { createKysely } from '@vercel/postgres-kysely'
import dataPool from '../../../data_pool/index'
import jwt from 'jsonwebtoken'
import Pusher from 'pusher'
interface Users {
    users: {
        id?: number
        account: string    // 登入帳號
        password: string   // 密碼 (實際專案密碼必須雜湊)
        username: string   // 使用者名稱
        menu: number[] | string    // 使用 JSONB 存選單權限
        created_at?: Date
    }
}
const getAllUser = async () => {
    const db = createKysely<Users>()
    return await db
        .selectFrom('users')
        .select(['id', 'account', 'username', 'menu', 'created_at'])
        .orderBy('created_at')
        .execute()
}
// pusher
const triggerUpdateUserList = async () => {
    const pusher = new Pusher({
        appId: process.env.PUSHER_APPID!,
        key: process.env.PUSHER_KEY!,
        secret: process.env.PUSHER_SECRET!,
        cluster: process.env.PUSHER_CLUSTER!
    })
    try {
        pusher.trigger('Setting', 'update-event', await getAllUser())
    } catch (error) {
        console.error('pusher error ', error)
    }
}
export const login = async (req: Request, res: Response) => {
    const { account: acc, password: psw } = req.body
    try {
        const db = createKysely<Users>()
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
        }
    } catch (error) {
        res.status(401).json({
            success: false,
            message: '登入失敗'
        })
    }
}
export const allUser = async (req: Request, res: Response) => {
    try {
        const users = await getAllUser()
        res.status(200).json({
            success: true,
            message: '查詢成功',
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '撈取資料失敗' + '/' + error
        })
    }
}

export const addUser = async (req: Request, res: Response) => {
    try {
        const db = createKysely<Users>()
        const { account, password, username, menu } = req.body
        const users = await db
            .insertInto('users')
            .values({
                account,
                password,
                username,
                menu: JSON.stringify(menu) // JSONB[]轉成數字傳送...待研究
            })
            .returning(['id', 'account', 'username', 'menu'])
            .executeTakeFirst()
        res.status(200).json({
            success: true,
            message: '新增成功',
            data: users
        })
        triggerUpdateUserList()
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '新增資料失敗' + '/' + error
        })
    }
}

export const modifyUser = async (req: Request, res: Response) => {
    try {
        const db = createKysely<Users>()
        const { id } = req.params
        const { account, password, username, menu } = req.body
        await db
            .updateTable('users')
            .set({
                account,
                password,
                username,
                menu: JSON.stringify(menu) // JSONB[]轉成數字傳送...待研究
            })
            .where('id', '=', parseInt(id))
            .execute()
        res.status(200).json({
            success: true,
            message: '更新成功',
        })
        triggerUpdateUserList()
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '更新資料失敗' + ' / ' + error
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const db = createKysely<Users>()
        const { id } = req.params
        await db
            .deleteFrom('users')
            .where('id', '=', parseInt(id))
            .execute()
        res.status(200).json({
            success: true,
            message: '刪除成功',
        })
        triggerUpdateUserList()
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '刪除資料失敗' + ' / ' + error
        })
    }
}