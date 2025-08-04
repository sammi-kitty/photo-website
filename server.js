import express from "express"
import nunjucks from "nunjucks"
import bodyparser from "body-parser"
import session from "express-session"
import bcrypt from "bcrypt"

import photoRouter from "./routes/photos.js"

const app = express()
const port = 3000

const saltRounds = 10

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { sameSite: true }
}))

nunjucks.configure("views", {
    autoescape: true,
    express: app,
})

app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.use("/, photoRouter")

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000/")
})