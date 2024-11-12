import express, { Express, Request, Response } from "express"
import path from "path";

export const setClient = (app: Express) => {
    
    // 設置靜態檔案
    app.use(express.static('public'))

    // 設置靜態首頁
    app.get('/', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, '../../public', 'indexs.html'));
    });

    // 處理瀏覽器自動發出的 favicon.ico 請求
    app.get('/favicon.ico', (req: Request, res: Response) => {
        res.status(204).end()
    })
}  