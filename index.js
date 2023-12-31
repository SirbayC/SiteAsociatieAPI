import express from "express"
import authRoutes from "./routes/authRoute.js"
import postRoutes from "./routes/postRoute.js"
import cors from "cors"
import 'dotenv/config'
import https from "https"
import fs from "fs"
import { } from "./db.js"
import oracledb from "oracledb";

const app = express()

app.use(express.json())
app.use(cors())

app.use("/auth", authRoutes)
app.use("/posts", postRoutes)

app.get('/', (req, res) => {
  res.json("Hi from the server! v2.3")
});

const PORT = process.env.PORT
const httpsServer = https.createServer(
  {
    key: fs.readFileSync(process.env.CERT_KEY_PATH),
    cert: fs.readFileSync(process.env.CERT_FULL_PATH)
  },
  app
).listen(PORT, () => {
  console.log(`Api Running on ${PORT}!`)
})

let connection;
try {
  console.log("Testing db connection...");
  connection = await oracledb.getConnection();
  console.log("Connected!");
} catch (err) {
  console.error(err);
} finally {
  if (connection) {
    try {
      await connection.close();
    } catch (err) {
      console.error(err);
    }
  }
}