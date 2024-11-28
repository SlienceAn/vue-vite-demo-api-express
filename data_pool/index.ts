export default {
    // Router List
    routerList: [{
        path: '/Main/Information',
        name: '主控台',
        icon: 'mti-Info'
    },
    {
        path: '/Main/Query',
        name: '設備查詢',
        icon: 'mti-QueryStats'
    },
    {
        path: '/Main/InspectionForm',
        name: '巡檢表單',
        icon: 'mti-Description'
    },
    {
        path: '/Main/Setting',
        name: '帳戶管理',
        icon: 'mti-Admin'
    }],
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