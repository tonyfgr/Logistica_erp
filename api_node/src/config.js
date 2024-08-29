import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 9090;
export const DB_HOST = process.env.DB_HOST || "127.0.0.1";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "123456";
export const DB_DATABASE = process.env.DB_DATABASE || "erp";
export const DB_PORT = process.env.DB_PORT || 3306;



// export const PORT_DEV = process.env.PORT || 9090;
// export const DB_HOST = process.env.DB_HOST || "db";
// export const DB_USER = process.env.DB_USER || "root";
// export const DB_PASSWORD = process.env.DB_PASSWORD || "test";
// export const DB_DATABASE = process.env.DB_DATABASE || "erp";
// export const DB_PORT = process.env.DB_PORT || 3306;