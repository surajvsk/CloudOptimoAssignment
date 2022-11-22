require("dotenv").config();
const pg = require("pg");
const config = {
  user: process.env.PG_USERNAME,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  max: 40,
  min: 1,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

const poolConnection = new pg.Pool(config);
module.exports = { pool: poolConnection };
