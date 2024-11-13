
import { NextFunction, Request, Response } from 'express'
// 定義正確的請求處理器型別
type RouteHandler = (
    req: Request,
    res: Response,
    next?: NextFunction
) => Promise<void> | void;

// 路由介面
interface IRoute {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete';
    handler: any;
}

// 路由建造者介面
interface IRouteBuilder {
    getRoutes(): IRoute[];
}
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

    private async allUser(req: Request, res: Response): Promise<void> {
        try {
            // 獲取所有用戶邏輯
            res.json({ users: [] });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    private async addUser(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body;
            // 添加用戶邏輯
            res.status(201).json({ message: 'User created' });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    private async modifyUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const userData = req.body;
            // 修改用戶邏輯
            res.json({ message: 'User updated' });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    private async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            // 刪除用戶邏輯
            res.json({ message: 'User deleted' });
        } catch (error) {
            res.status(400).json({ error });
        }
    }
}