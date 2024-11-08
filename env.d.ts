// process.env 中的所有值都是字串（string）
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            NODE_ENV: 'development';
            JWT_SECRET: string;
            JWT_EXPIRE: string;
            PUSHER_APPID: string,
            PUSHER_KEY: string,
            PUSHER_SECRET: string,
            PUSHER_CLUSTER: string
        }
    }
}

// 這個 export {} 是必需的，讓 TypeScript 將此檔案視為模組
export {}