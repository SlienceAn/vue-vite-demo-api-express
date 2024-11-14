
import { Request, Response } from 'express'
import { IRouteBuilder, IRoute } from '../type'

export class UserRoutes implements IRouteBuilder {
    getRoutes(): IRoute[] {
        return [
            {
                path: '/user',
                method: 'get',
                handler: this.allUser
            },
            {
                path: '/user',
                method: 'post',
                handler: this.addUser
            },
            {
                path: '/user/:id',
                method: 'put',
                handler: this.modifyUser
            },
            {
                path: '/user/:id',
                method: 'delete',
                handler: this.deleteUser
            }
        ];
    }
    // 獲取所有用戶邏輯
    private async allUser(req: Request, res: Response): Promise<void> {
        try {
            res.json({ users: [] });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    // 添加用戶邏輯
    private async addUser(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body;
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
            res.json({ message: 'User updated' });
        } catch (error) {
            res.status(400).json({ error });
        }
    }
    // 刪除用戶邏輯
    private async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            res.json({ message: 'User deleted' });
        } catch (error) {
            res.status(400).json({ error });
        }
    }
}