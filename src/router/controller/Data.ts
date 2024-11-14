import { Request, Response } from 'express'
import { IRoute, IRouteBuilder } from '../type'

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
                handler: this.addData
            },
            {
                path: '/data/:id',
                method: 'put',
                handler: this.modifyData
            },
            {
                path: '/data/:id',
                method: 'delete',
                handler: this.deleteData
            }
        ]
    }
    // 獲取所有資料
    private async allData(req: Request, res: Response): Promise<void> {
        try {
            res.json({ data: [] });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    // 添加資料邏輯
    private async addData(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
            res.status(201).json({ message: 'data created' });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    // 修改資料邏輯
    private async modifyData(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data = req.body;
            res.json({ message: 'data updated' });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    // 刪除資料邏輯
    private async deleteData(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            res.json({ message: 'data deleted' });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}