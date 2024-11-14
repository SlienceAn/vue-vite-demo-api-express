import { Request, Response } from 'express'
import { IRoute, IRouteBuilder } from '../type'


export class OtherRoutes implements IRouteBuilder {
    getRoutes(): IRoute[] {
        return [
            {
                path: '/other',
                method: 'get',
                handler: this.allOther
            }
        ]
    }

    private async allOther(req: Request, res: Response): Promise<void> {
        try {
            // 獲取所有其他資料
            res.json({ other: [] });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}