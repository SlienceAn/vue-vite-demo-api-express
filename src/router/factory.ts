import { IRoute } from './type'
import { UserRoutes } from './controller/User'
import { AuthRoutes } from './controller/Auth'
import { OtherRoutes } from './controller/Other'


// 路由建造者介面
interface IRouteBuilder {
    getRoutes(): IRoute[];
}

export class RouteFactory {
    // 創建特定類型的路由
    static createRoutes(type: string): IRouteBuilder {
        // 判斷路由類型
        switch (type) {
            case 'user':
                return new UserRoutes();
            case 'auth':
                return new AuthRoutes();
            case 'other':
                return new OtherRoutes();    
            default:
                throw new Error(`Route type ${type} not supported`);
        }
    }
}