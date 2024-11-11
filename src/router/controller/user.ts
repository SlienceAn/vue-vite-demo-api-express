import { Request, Response } from 'express'
import { createKysely } from '@vercel/postgres-kysely'

interface Users {
    users: {
        id?: number
        account: string    // 登入帳號
        password: string   // 密碼
        username: string   // 使用者名稱
        menu: number[]     // 使用 JSONB 存選單權限
        created_at?: Date
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
            .executeTakeFirst() // 只返回第一筆資料
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