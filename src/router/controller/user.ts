import { Request, Response } from 'express'
import { createKysely } from '@vercel/postgres-kysely'
import dataPool from '../../../data_pool/index'
import jwt from 'jsonwebtoken'
interface Users {
    users: {
        id?: number
        account: string    // 登入帳號
        password: string   // 密碼 (實際專案密碼必須雜湊)
        username: string   // 使用者名稱
        menu: number[]     // 使用 JSONB 存選單權限
        created_at?: Date
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
            users.menu.forEach(el => menu.push(routerList[el - 1]))
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
                menu
            })
            .returning(['id', 'account', 'username', 'menu'])
            .executeTakeFirst() 
        res.status(200).json({
            success: true,
            message: '新增成功',
            data: users
        })
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
        const { id, account, password, username, menu } = req.body
        await db
            .updateTable('users')
            .set({
                account,
                password,
                username,
                menu
            })
            .where('id', '=', id)
            .execute()
        res.status(200).json({
            success: true,
            message: '更新成功',
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '更新資料失敗' + ' / ' + error
        })
    }
}