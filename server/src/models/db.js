import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '200221',
    database: 'urbandripstore',
}

export const connection = await mysql.createConnection(config);