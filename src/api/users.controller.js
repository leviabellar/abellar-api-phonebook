import UsersDAO from "../dao/usersDAO.js"

export default class UsersController {
    static async apiSignupUser(req, res, next) {
        try {
            const userFromBody = req.body
            let errors = {}
            if (userFromBody && userFromBody.password.length < 5) {
                errors.password = "password must be at least 5 characters"
            }

            if (Object.keys(errors).length > 0) {
                res.status(400).json(errors)
            }

            const insertUser = await UsersDAO.signupUser(userFromBody.email, userFromBody.password)
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }
}