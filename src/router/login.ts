import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'

//Router List
const routerList = [{
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
    path: '/Main/StationAnalysis',
    name: '測站分析',
    icon: 'mti-TroubleShoot'
}]
//測試資料
const userList = [
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
]
export const login = (req: Request, res: Response) => {
    const { account: acc, password: psw } = req.body
    //選單列表
    const menu: any = []
    //是否有匹配帳號密碼
    const userCheck = userList.find(el => el.acc === acc && el.psw === psw)
    if (!userCheck) {
        res.status(401).json({
            success: false,
            message: '登入失敗!'
        })
        return
    }
    userCheck.menu.forEach(el => menu.push(routerList[el - 1]))
    // 產生JWT Token
    const token = jwt.sign(
        userCheck,
        process.env.JWT_SECRET as string,
        {
            expiresIn: 600
        }
    )
    res.status(200).json({
        token,
        success: true,
        userName: userCheck.userName,
        isPremission: true,
        message: 'Login Success',
        menu
    })
}
