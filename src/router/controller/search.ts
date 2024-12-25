import { Request, Response } from 'express'
import data from '@data/itemData'
export const search = (req: Request, res: Response) => {
    const { city } = req.query
    if (!city) {
        res.status(400).json({
            success: false,
            message: '參數錯誤'
        })
    }
    const list = data?.data.filter(el => el.city === city)
    res.status(200).json({
        success: true,
        message: '查詢成功',
        data: list
    })
}