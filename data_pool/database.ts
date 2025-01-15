import { sql } from '@vercel/postgres'

// 判斷資料庫連線
const connectionDatabase = async () => {
    try {
        const result = await sql`SELECT 1`;
        console.log('資料庫連線成功!')
    } catch (error: any) {
        console.error('資料庫連線失敗', error.message)
    }
}

// 建立使用者資料表
const createUserTable = async () => {
    try {
        await sql`
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            account VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL,
            menu JSONB NOT NULL DEFAULT '[]',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;
        console.log('資料表建立成功啦! 真的建立了');
    } catch (error) {
        console.error('建立資料表錯誤:', error);
    }
}

// 刪除使用者資料表
const dropUserTable = async () => {
    try {
        await sql`DROP TABLE IF EXISTS users`
        console.log('資料表已成功刪除')
    } catch (error) {
        console.error('刪除資料表失敗', error)
    }
}

connectionDatabase.createUserTable = createUserTable
connectionDatabase.dropUserTable = dropUserTable
export default connectionDatabase