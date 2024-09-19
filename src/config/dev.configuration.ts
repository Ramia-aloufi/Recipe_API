import  'dotenv/config';

export const dev = {
    app: {
        port: Number(process.env.PORT) || 3003,
    },
    db: {
        url: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/any',
      },
      
    JWT_SECRET:process.env.JWT_SECRET || "JWT_SECRET",
    AUTH_TOKEN:process.env.AUTH_TOKEN || "AUTH_TOKEN"
      
}
