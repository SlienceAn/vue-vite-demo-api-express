import { Router } from 'express'
import { RouteFactory } from './factory'

// 設置路由
export const setupRoutes = (router: Router): Router => {

    // 創建不同類型的路由
    const userRoutes = RouteFactory.createRoutes('user').getRoutes();
    const authRoutes = RouteFactory.createRoutes('auth').getRoutes();
    const OtherRoutes = RouteFactory.createRoutes('other').getRoutes();

    // 註冊所有路由
    [...userRoutes, ...authRoutes, ...OtherRoutes].forEach(route => {
        router[route.method](route.path, route.handler)
    })

    return router
}