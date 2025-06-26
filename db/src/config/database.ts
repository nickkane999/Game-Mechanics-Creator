import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { DatabaseConfig } from '../types/index';

dotenv.config();

const dbConfig: DatabaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'game_mechanics_creator',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

export async function testConnection(): Promise<boolean> {
  if (process.env.NODE_ENV === 'development' && process.env.SKIP_DB === 'true') {
    console.log('⚠️  Skipping MySQL connection (SKIP_DB=true)');
    return true;
  }
  
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL Connected Successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ MySQL Connection Failed:', error instanceof Error ? error.message : 'Unknown error');
    console.log('💡 Tip: Install XAMPP or set SKIP_DB=true in .env to run without MySQL');
    return false;
  }
}

export async function createDatabase(): Promise<boolean> {
  if (process.env.NODE_ENV === 'development' && process.env.SKIP_DB === 'true') {
    console.log('⚠️  Skipping database creation (SKIP_DB=true)');
    return true;
  }
  
  try {
    const tempConfig = { ...dbConfig };
    delete (tempConfig as any).database;
    const tempPool = mysql.createPool(tempConfig);
    
    const connection = await tempPool.getConnection();
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    console.log(`✅ Database '${dbConfig.database}' created/verified`);
    connection.release();
    await tempPool.end();
    return true;
  } catch (error) {
    console.error('❌ Database creation failed:', error instanceof Error ? error.message : 'Unknown error');
    return false;
  }
}

export { pool, dbConfig }; 