import passport from 'passport'
import { Strategy as localStrategy } from 'passport-local'
import { Strategy as JWTstrategy} from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import bcrypt from 'bcryptjs'
import UsersDAO from '../../dao/usersDAO.js'

passport.use(
    new JWTstrategy({
        secretOrKey: 'A_VERY_SECRET_KEY',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
        try {
            return done(null, token.user)
        } catch (e) {
            done(e);
        }
    })
)

passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
async (email, password, done) => {
    try {
        let emailExist = await UsersDAO.checkEmailIfExist(email)
        bcrypt.hash(password, 10, (err, hash) => {
            if(emailExist) return done(null, { message: 'Email Exist' })
            const password = hash;
            let result = UsersDAO.signupUser(email, password)
            return done(null, result)
        })
    } catch (e) {
        done(e)
    }
}))

passport.use('login', new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            let result = await UsersDAO.checkEmailIfExist(email)
            if (!result) return done(null, false, { message: 'Email not found' })
            bcrypt.compare(password, result.password, (e, match) => {
                if(!match) return done(null, false, { message: 'Wrong password' })
                return done(null, match, { message: 'Login successfully' })
            })

        } catch (e) {
            return done(e)
        }
    }
))

export default passport