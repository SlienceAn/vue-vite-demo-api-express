import { Request, Response, NextFunction } from 'express'

// 定義驗證策略的集合
// 每個物件代表一個驗證策略，包含該策略下的不同驗證規則
const validationRules = {
    // login 驗證策略
    login: {
        // 每個屬性都是一個具體的驗證規則
        token: (value: string) => value && value.length >= 24,
        expire: (value: string) => /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\s([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(value)
    },

    // user 驗證策略
    user: {
        username: (value: string | any[]) => value && value.length >= 3,
        password: (value: string | any[]) => value && value.length >= 8,
        email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    },

    // data 驗證策略
    data: {
        name: (value: string | any[]) => value && value.length >= 2,
        price: (value: number) => value && !isNaN(value) && value > 0,
    },
};

// 從 validationRules 推導出型別
type ValidationRules = typeof validationRules
type ValidationType = keyof ValidationRules

// 負責持有並執行具體的驗證策略
class Validator {
    // 儲存當前使用的驗證策略
    private rules: ValidationRules[ValidationType]
    // 通過建構函數注入具體的驗證策略
    constructor(type: ValidationType) {
        this.rules = validationRules[type]
    }
    // 執行驗證策略的方法
    public validate(data: any) {
        const errors = []
        // 遍歷當前策略中的所有規則
        const entries = Object.entries(this.rules) as [string, any]
        for (const [field, rule] of entries) {
            // 執行每個具體的驗證規則
            if (!rule(data[field])) {
                errors.push(`${field} 欄位資料錯誤`);
            }
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

// 驗證中間件
const validateMiddleware = (type: ValidationType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // 創建驗證器實例，並注入對應的驗證策略
        const validator = new Validator(type)
        // 執行驗證
        const result = validator.validate(req.body)
        if (!result.isValid) {
            return res.status(400).json({
                success: false,
                errors: result.errors
            })
        }
        next()
    }
}
export default validateMiddleware