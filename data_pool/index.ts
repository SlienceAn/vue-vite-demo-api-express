import item from './itemData'
export default {
    // Router List
    routerList: [
        {
            path: '/Information',
            name: 'Information',
            meta: {
                title: '主控台',
                icon: 'mti-Info',
                hide: false
            }
        },
        {
            path: '/Query',
            name: 'Query',
            meta: {
                title: '設備查詢',
                icon: 'mti-QueryStats',
                hide: false
            }
        },
        {
            path: '/InspectionForm',
            name: 'InspectionForm',
            meta: {
                title: '巡檢表單',
                icon: 'mti-Description',
                hide: false
            }
        },
        {
            path: '/Setting',
            name: 'Setting',
            meta: {
                title: '帳戶管理',
                icon: 'mti-Admin',
                hide: false
            }
        }
    ],
    data: item?.data,
    city: item?.city
}