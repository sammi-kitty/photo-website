import express from "express"
import loginRouter from "/routes/login.js"

const router = express.Router()

app.use("/login", loginRouter)

router.get("/", async (request, response) => {
    response.render("index.njk")
})

export default router;