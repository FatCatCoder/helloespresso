const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
};

const prodConfig = {
    // uncomment on real production 
    // connectionString: process.env.DATABASE_URL // deployment server addon here

    // remove on deployment
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
}

const pool = new Pool(
    process.env.NODE_ENV === "production" ? prodConfig : devConfig
);

module.exports = pool;