import { IRoute } from './type'



// 路由建造者介面
interface IRouteBuilder {
    getRoutes(): IRoute[];
}


class RouteFactory {

    // 創建特定類型的路由
    static createRoutes(type: string): IRouteBuilder {
        switch (type) {
            case 'user':
                return new UserRoutes();
            case 'auth':
                return new AuthRoutes();
            default:
                throw new Error(`Route type ${type} not supported`);
        }
    }
}