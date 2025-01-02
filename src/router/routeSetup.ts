import { Router } from 'express'
import { RouteFactory } from './factory'
import { Request, Response, NextFunction } from 'express'

// 設置路由
export const setupRoutes = (router: Router): Router => {

    // 創建不同類型的路由
    const userRoutes = RouteFactory.createRoutes('user').getRoutes();
    const authRoutes = RouteFactory.createRoutes('auth').getRoutes();
    const dataRoutes = RouteFactory.createRoutes('data').getRoutes();

    // 註冊所有路由
    [...userRoutes, ...authRoutes, ...dataRoutes].forEach(route => {
        if (route.middlewares) {
            router[route.method](route.path, ...route.middlewares, route.handler)
        } else {
            router[route.method](route.path, route.handler)
        }
    })
    console.log([...userRoutes, ...authRoutes, ...dataRoutes])
    return router
}