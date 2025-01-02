// 導入必要的 mysql2 模組，使用 promise 版本以支持異步操作
import mysql, { Pool, PoolOptions } from 'mysql2/promise'

/**
 * Database 類 - 實現單例模式的數據庫連接管理器
 * 確保整個應用程序只有一個數據庫連接池實例
 */
class Database {
    private static instance: Database
    private pool!: Pool | null
    private readonly DatabaseConfig: Readonly<PoolOptions> = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123',
        database: 'testdb',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    } as const

    constructor() {
        if (Database.instance) {
            return Database.instance
        }
        // 初始化連接池為 null
        this.pool = null
        // 保存當前實例
        Database.instance = this
    }

    /**
    * 建立數據庫連接
    * 如果連接池不存在則創建新的連接池
    * @returns Promise<Pool> 返回數據庫連接池
    */
    public async connect(): Promise<Pool> {
        // 如果連接池已存在，直接返回
        if (this.pool) {
            return this.pool
        }

        // 創建新的連接池
        this.pool = mysql.createPool(this.DatabaseConfig)

        // 測試連接
        try {
            await this.pool.getConnection()
            console.log('Database connection successful');
        } catch (error) {
            console.error('Database connection failed:', error);
            throw error;
        } finally {
            // 確保連接被釋放回池中
            (await this.pool.getConnection()).release()
        }
        return this.pool
    }
    /**
      * 關閉數據庫連接
      * 終止連接池並釋放資源
      * 在應用程序結束時應該調用此方法
      * @returns Promise<void>
      */
    public async close(): Promise<void> {
        if (this.pool) {
            await this.pool.end();
            this.pool = null
        }
    }
    /**
      * 執行 SQL 查詢
      * 泛型方法，可以指定返回結果的類型
      * 自動處理連接的創建和錯誤處理
      * @param sql SQL 查詢語句
      * @param params 查詢參數（可選）用於預處理語句
      * @returns Promise<T[]> 返回查詢結果陣列
      * @throws Error 如果查詢執行失敗會拋出錯誤
      */
    public async query<T>(sql: string, params?: any[]): Promise<T[]> {
        if (!this.pool) {
            await this.connect()
        }
        try {
            // 執行 SQL 查詢，使用解構賦值獲取結果
            const [result] = await this.pool!.execute(sql, params)
            return result as T[]
        } catch (error) {
            console.error('Database query error:', error);
            throw error;
        }
    }
}

// 導出 Database 類的單例實例
// 確保整個應用程序使用同一個數據庫連接實例
export default new Database()