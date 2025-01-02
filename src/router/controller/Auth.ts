import { Request, Response } from 'express'
import { IRouteBuilder, IRoute } from '../type'
import db from '../../db'
import validator from '../validator'
export class AuthRoutes implements IRouteBuilder {
    getRoutes(): IRoute[] {
        return [
            {
                path: '/login',
                method: 'post',
                handler: this.loginUser,
                middlewares: [validator('user')]
            },
            {
                path: '/logins',
                method: 'post',
                handler: this.loginUser,
                middlewares: [validator('product')]
            }
        ];
    }
    // 登入邏輯
    private async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            // 驗證邏輯
            console.log('驗證邏輯處理')
            const data = await db.query('SQL Syntax')
            // 驗證通過回傳
            res.json({ message: 'Login successful', });
        } catch (error) {
            res.status(400).json({ error });
        }
    }
}