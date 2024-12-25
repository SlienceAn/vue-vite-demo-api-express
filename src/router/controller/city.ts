import { Request, Response } from 'express'
import data from '@data/index'

export const city = (req: Request, res: Response) => {
    try {
        const list = data.data?.map(el => ({
            id: el.id,
            city: el.city,
            address: el.address
        }))
        res.status(200).json({
            success: true,
            message: '查詢成功',
            data: list
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '查詢失敗',
        })
    }

}