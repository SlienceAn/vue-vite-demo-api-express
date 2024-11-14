import { Request, Response, NextFunction } from 'express'

// 定義正確的請求處理器型別
export type RouteHandler = (
    req: Request,
    res: Response,
    next?: NextFunction
) => Promise<void> | void;

// 路由介面
export interface IRoute {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete';
    handler: RouteHandler;
}

// 路由建造者介面
export interface IRouteBuilder {
    getRoutes(): IRoute[];
}