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
class AuthRoutes implements IRouteBuilder {
    getRoutes(): IRoute[] {
        return [
            {
                path: '/login',
                method: 'post',
                handler: this.loginUser
            }
        ];
    }

    private async loginUser(req: Request, res: Response): Promise<void> {
        try {
            // 登入邏輯
            const { email, password } = req.body;
            // ... 驗證邏輯
            res.json({ message: 'Login successful' });
        } catch (error) {
            res.status(400).json({ error });
        }
    }
}