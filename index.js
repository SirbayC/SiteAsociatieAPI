import express from "express"
import authRoutes from "./routes/authRoute.js"
import postRoutes from "./routes/postRoute.js"
import cors from "cors"
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)

app.get('/', (req, res) => {
  res.json("Yess")
});

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Api Running on ${PORT}!`)
})

