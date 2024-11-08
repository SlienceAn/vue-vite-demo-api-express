import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dataPool from '../../data_pool'

export const login = (req: Request, res: Response) => {
    const { account: acc, password: psw } = req.body
    const { routerList, userList } = dataPool
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
        { expiresIn: parseInt(process.env.JWT_EXPIRE!) }
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
