const Pool = require("pg").Pool;
require("dotenv").config();

const Config = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
}

const pool = new Pool(Config);

module.exports = pool;