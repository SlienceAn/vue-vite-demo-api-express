
import { Request, Response } from 'express'
import { IRouteBuilder, IRoute } from '../type'
import db from '../../db'
import validator from '../validator'
export class UserRoutes implements IRouteBuilder {
    getRoutes(): IRoute[] {
        return [
            {
                path: '/user',
                method: 'get',
                handler: this.allUser,
            },
            {
                path: '/user',
                method: 'post',
                handler: this.addUser,
                middlewares: [validator('user')]
            },
            {
                path: '/user/:id',
                method: 'put',
                handler: this.modifyUser,
                middlewares: [validator('user')]
            },
            {
                path: '/user/:id',
                method: 'delete',
                handler: this.deleteUser,
                middlewares: [validator('user')]
            }
        ];
    }
    // 獲取所有用戶邏輯
    private async allUser(req: Request, res: Response): Promise<void> {
        try {
            const data = await db.query('SQL Syntax')
            res.json({ users: [] });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    // 添加用戶邏輯
    private async addUser(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body;
            const data = await db.query('SQL Syntax')
            res.status(201).json({ message: 'User created' });
        } catch (error) {
            res.status(400).json({ error });
        }
    }
    // 修改用戶邏輯
    private async modifyUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const userData = req.body;
            const data = await db.query('SQL Syntax')
            res.json({ message: 'User updated' });
        } catch (error) {
            res.status(400).json({ error });
        }
    }
    // 刪除用戶邏輯
    private async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data = await db.query('SQL Syntax')
            res.json({ message: 'User deleted' });
        } catch (error) {
            res.status(400).json({ error });
        }
    }
}