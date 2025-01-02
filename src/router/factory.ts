import { IRouteBuilder } from './type'
import { UserRoutes } from './controller/User'
import { AuthRoutes } from './controller/Auth'
import { DataRoutes } from './controller/Data'

// 路由工廠
export class RouteFactory {
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