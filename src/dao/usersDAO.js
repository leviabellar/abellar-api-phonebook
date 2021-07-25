let users

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) {
            return
        }
        try {
            users = await conn.db('task003').collection('users')
        } catch (e) {
            console.error(`Unable to establish collection in userDAO: ${e}`)
        }
    }

    static async checkEmailIfExist(email) {
        const result = await users.findOne({ email })
        return result
    }

    static async signupUser(email, password) {
        await users.insertOne({ email, password })
        return await users.findOne({ email, password })
    }
}