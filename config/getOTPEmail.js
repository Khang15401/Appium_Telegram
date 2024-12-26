const { Client } = require('pg');
const dotenv = require("dotenv");
const path = require('path');

// Load .env from project root
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Verify env vars
const requiredEnvVars = ['DB_HOST', 'DB_PASSWORD'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

async function getOtpFromDatabase() {
    const client = new Client({
        user: 'tbk',          
        host: process.env.DB_HOST,           
        database: 'tbk',   
        password: process.env.DB_PASSWORD,   
        port: 26257,                 
        ssl: {                       
            rejectUnauthorized: false
        },
        connectionTimeoutMillis: 5000,
        query_timeout: 10000
    });


    try {
        await client.connect();
        const query = "SELECT * FROM otp WHERE user_id = 'd6169edc-a6ff-4582-8890-a58c4096f345' ORDER BY date_expired DESC;";
        const res = await client.query(query);
        
        if (res.rows.length > 0) {
            const otp = res.rows[0].otp;
            // console.log('OTP Retrieved:', otp);
            return otp;
        }
        return null;
    } catch (err) {
        console.error('DB Error:', err);
        throw err;
    } finally {
        await client.end();
    }
}

module.exports = getOtpFromDatabase;