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
    // User List
    userList: [
        {
            acc: 'pm',
            psw: '123',
            userName: 'PM',
            menu: [1, 2, 4]
        },
        {
            acc: 'rd',
            psw: '123',
            userName: 'RD',
            menu: [1, 2, 3, 4]
        },
        {
            acc: 'test',
            psw: '123',
            userName: 'Test',
            menu: [1, 2]
        },
        {
            acc: 'guest',
            psw: '123',
            userName: '訪客',
            menu: [1]
        },
        {
            acc: 'admin',
            psw: 'admin',
            userName: '管理員',
            menu: [1, 2, 3, 4]
        }
    ],
    // Fake list
    testList: [

    ]
}