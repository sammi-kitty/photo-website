import express from "express"
import loginRouter from "/login.js"
import db from "../db-sqlite.js"

const router = express.Router()

app.use("/login", loginRouter)

router.get("/", async (request, response) => {
    response.render("index.njk")
})

router.get("/page/:pageID", async (request, response) => {
    const pageID = request.params.pageID

    //const page = Get images from DB or elsewhere using pageID

    const username = await db.get(`
        SELECT user.name FROM users
        WHERE user.id = ? LIMIT 1
        `, pageID)

    response.render("page.njk", {
        images: images,
        title: username,
    })
})

export default router;