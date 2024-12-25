import { Request, Response } from 'express'
import data from '@data/itemData'
// 依據日期展開資料
const transformData = (data: any[]) => {
    const groupedByDate: any = {}
    data.forEach((el: any[]) => {
        el.forEach((item: any) => {
            const { date, item: measurementType, value, unit, text } = item
            if (!groupedByDate[date]) {
                groupedByDate[date] = {
                    date: date,
                    measurements: {}
                }
            }
            groupedByDate[date].measurements[measurementType] = {
                value,
                unit,
                text
            }
        })
    })

    return Object.values(groupedByDate)
}
export const device = (req: Request, res: Response) => {
    const { city, page, size } = req.query
    const cityList = data?.data.filter(el => el.city === city)!
    const transformList = cityList[0].data.map((el: any) => {
        return el.value.date.map((date: any, index: number) => ({
            item: el.item,
            unit: el.unit,
            text: el.text,
            date: date,
            value: el.value.value[index]
        }))
    })
    if (!city || !size || !page) {
        res.status(400).json({
            success: false,
            message: '參數錯誤'
        })
        return
    }
    const startIndex = (Number(page) - 1) * Number(size) // 開始索引
    const endIndex = startIndex + Number(size) // 結束索引
    res.status(200).json({
        success: true,
        message: '查詢成功',
        data: transformData(transformList).slice(startIndex, endIndex),
        page,
        size,
        total: transformData(transformList).length
    })
}