import express, { Application, Request, Response } from "express"
import path from "path";

export const setClient = (app: Application) => {

    // 設置靜態檔案
    app.use(express.static('public'))

    // 設置靜態首頁
    app.get('/', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, '../../public', 'index.html'));
    });

    // 處理瀏覽器自動發出的 favicon 請求
    // 1. 一律回應 204
    // 2. 不記錄 favicon 請求到日誌
    app.get(/^\/favicon\.(ico|png|jpg|jpeg|gif|svg)$/, (req: Request, res: Response) => {
        res.status(204).end()
    })
}  