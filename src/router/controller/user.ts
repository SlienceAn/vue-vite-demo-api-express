import { Request, Response } from 'express'
import { createKysely } from '@vercel/postgres-kysely'
import { triggerUpdateUserList } from '@/pusher/trigger'

const getAllUser = async () => {
    const db = createKysely<UserTableColumn>()
    return await db
        .selectFrom('users')
        .select(['id', 'account', 'username', 'menu', 'created_at'])
        .orderBy('created_at')
        .execute()
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
        const db = createKysely<UserTableColumn>()
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
        triggerUpdateUserList(getAllUser)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '新增資料失敗' + '/' + error
        })
    }
}
export const modifyUser = async (req: Request, res: Response) => {
    try {
        const db = createKysely<UserTableColumn>()
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
        triggerUpdateUserList(getAllUser)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '更新資料失敗' + ' / ' + error
        })
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const db = createKysely<UserTableColumn>()
        const { id } = req.params
        await db
            .deleteFrom('users')
            .where('id', '=', parseInt(id))
            .execute()
        res.status(200).json({
            success: true,
            message: '刪除成功',
        })
        triggerUpdateUserList(getAllUser)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '刪除資料失敗' + ' / ' + error
        })
    }
}