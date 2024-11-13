import { Request, Response, NextFunction } from 'express'

export type RouteHandler = (req: Request, res: Response, next?: NextFunction) => Promise<void> | void;

export interface IRoute {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete';
    handler: RouteHandler;
}

// 路由建造者介面
export interface IRouteBuilder {
    getRoutes(): IRoute[];
}