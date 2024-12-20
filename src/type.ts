// user資料表欄位
declare global {
    interface UserTableColumn {
        users: {
            id?: number
            account: string    // 登入帳號
            password: string   // 密碼 (實際專案密碼必須雜湊)
            username: string   // 使用者名稱
            menu: number[] | string    // 使用 JSONB 存選單權限
            created_at?: Date
        }
    }
} 

export {}