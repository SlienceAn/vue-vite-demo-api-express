import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET' && req.headers['content-length']) {
        return res.status(400).json({
            success: false,
            error: 'GET request should not contain a body'
        })
    }
    res.status(500).json({
        success: false,
        error: '伺服器錯誤 => ' + err
    });
}