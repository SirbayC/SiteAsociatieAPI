import express from "express"
import authRoutes from "./routes/authRoute.js"
import postRoutes from "./routes/postRoute.js"
import cors from "cors"
import 'dotenv/config'
import https from "https"
import fs from "fs"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)

app.get('/', (req, res) => {
  res.json("Slayyy2")
});

const PORT = process.env.PORT
const httpsServer = https.createServer(
  {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  },
  app
).listen(PORT, () => {
  console.log(`Api Running on ${PORT}!`)
})

