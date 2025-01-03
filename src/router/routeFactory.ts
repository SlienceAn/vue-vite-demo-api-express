import { IRouteBuilder } from './type'
import { UserRoutes } from './controller/User'
import { AuthRoutes } from './controller/Auth'
import { DataRoutes } from './controller/Data'
import { Router } from 'express'

// 路由工廠
class RouteFactory {
    // 創建特定類型的路由
    static createRoutes(type: string): IRouteBuilder {
        // 判斷路由類型
        switch (type) {
            case 'user':
                return new UserRoutes();
            case 'auth':
                return new AuthRoutes();
            case 'data':
                return new DataRoutes();
            default:
                throw new Error(`Route type ${type} not supported`);
        }
    }
}

// 設置路由
export const routeSetup = (router: Router): Router => {

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
    return router
}
