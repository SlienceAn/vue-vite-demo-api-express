import { Request, Response, NextFunction } from 'express'

// 定義基本的驗證規則
const validationRules: any = {
    // 使用者驗證規則
    user: {
        username: (value: string | any[]) => value && value.length >= 3,
        email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        password: (value: string | any[]) => value && value.length >= 8
    },

    // 產品驗證規則
    product: {
        name: (value: string | any[]) => value && value.length >= 2,
        price: (value: number) => value && !isNaN(value) && value > 0,
        stock: (value: number) => !isNaN(value) && value >= 0
    }
};

class Validator {
    private rules: any
    constructor(type: any) {
        this.rules = validationRules[type]
    }

    public validate(data: any) {
        console.log('老子需要驗證阿!!!!')
        const errors = []
        const entries = Object.entries(this.rules) as [string, any]
        for (const [field, rule] of entries) {
            if (!rule(data[field])) {
                errors.push(`Invalid ${field}`);
            }
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
const validateMiddleware = (type: any) => {
    const validator = new Validator(type)
    validator.validate('dddd')
    return (req: Request, res: Response, next: NextFunction) => {
        const validator = new Validator(type)
        const result = validator.validate(req.body)
        if (!result.isValid) {
            return res.status(400).json({ errors: result.errors })
        }
        next()
    }
}
export default validateMiddleware