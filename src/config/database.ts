import mysql, { Pool, PoolConnection } from 'mysql2/promise';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    private static instance: Database;
    private static pool: Pool;

    static getInstance(): Database {
        if (!Database.instance)
            Database.instance = new Database();

        return Database.instance;
    }

    static async connect(): Promise<PoolConnection> {
        if (!Database.pool) {
            try {
                Database.pool = mysql.createPool({
                    host: process.env.DB_HOST || 'localhost',
                    user: process.env.DB_USER || 'root',
                    password: process.env.DB_PASSWORD || 'root',
                    database: process.env.DB_NAME || 'test',
                    connectionLimit: 2, // Número máximo de conexiones en el pool
                });
            }
            catch (e) {
                throw e;
            }
        }

        return Database.pool.getConnection();
    }
}

export { Database };