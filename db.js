import oracledb from "oracledb";
import 'dotenv/config'

console.log("pool creation")

await oracledb.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONN
});