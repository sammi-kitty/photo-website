import bcrypt from "bcrypt"
import express from "express"

const router = express.Router()

router.get("/login", async (request, response) => {
    response.render("login.njk")
})

router.post("/login", async (request ,response) => {
    const attemptedpassword = request.body.password
    const attemptedusername = request.body.username

    const user = await db.get(`
        SELECT users.* FROM users
        WHERE users.name = ? LIMIT 1;
        `, attemptedusername)

    bcrypt.compare(attemptedpassword, user.password, function (err, result) {
        if (err) {
            console.log(err)
            //SKRIV UT FELMEDDELANDE TILL ANVÄNDARE - SERVER ERROR
            return response.redirect(request.get("Referrer") || "/")
        }
        else {
            if (result) {
                request.session.loggedin = true
                request.session.userid = user.id

                return response.redirect("/page/" + user.id)
            }
            else {
                //SKRIV UT FELMEDDELANDE TILL ANVÄNDARE - FEL LOGIN
                return response.redirect(request.get("Referrer") || "/")
            }
        }
    })
})

export default router;