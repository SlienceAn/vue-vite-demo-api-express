import { Request, Response } from 'express'
import data from '@data/itemData'

export const info = (req: Request, res: Response) => {
    const { city, month } = req.query
    const flatDataList = (arr: any) => {
        try {
            return arr
                .filter((el: any) => el.city === city)
                .map((item: any) => ({
                    address: item.address,
                    data: item.data.map((val: any) => {
                        const { value: { date, value }, ...rest } = val
                        const filterDate = date.filter((i: any) => i.includes(month))
                        return {
                            ...rest,
                            date: filterDate,
                            value: value.slice(0, filterDate.length)
                        }
                    })
                }))
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Info資料處理錯誤 / ' + error
            })
            console.log('Info資料處理錯誤', error)
        }
    }

    res.status(200).json({
        success: true,
        message: '查詢成功',
        data: flatDataList(data?.data)
    })
}