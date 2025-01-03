import { Request, Response } from 'express'
import { IRoute, IRouteBuilder } from '../type'
import db from '../../db'
import validator from '../validator'
export class DataRoutes implements IRouteBuilder {
    getRoutes(): IRoute[] {
        return [
            {
                path: '/data',
                method: 'get',
                handler: this.allData
            },
            {
                path: '/data',
                method: 'post',
                handler: this.addData,
                middlewares:[validator('data')]
            },
            {
                path: '/data/:id',
                method: 'put',
                handler: this.modifyData,
                middlewares:[validator('data')]
            },
            {
                path: '/data/:id',
                method: 'delete',
                handler: this.deleteData,
                middlewares:[validator('data')]
            }
        ]
    }
    // 獲取所有資料
    private async allData(req: Request, res: Response): Promise<void> {
        try {
            const data = await db.query('SQL Syntax')
            res.json({ data: [] });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    // 添加資料邏輯
    private async addData(req: Request, res: Response): Promise<void> {
        try {
            const params = req.body;
            const data = await db.query('SQL Syntax')
            res.status(201).json({ message: 'data created' });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    // 修改資料邏輯
    private async modifyData(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const params = req.body;
            const data = await db.query('SQL Syntax')
            res.json({ message: 'data updated' });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    // 刪除資料邏輯
    private async deleteData(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data = await db.query('SQL Syntax')
            res.json({ message: 'data deleted' });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}