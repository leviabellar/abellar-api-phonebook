import { Router } from 'express'
import UsersCtrl from './users.controller.js'
import passport from './auth/auth.js'
import jwt from 'jsonwebtoken'

const router = new Router()

router.route('/signup').post(passport.authenticate('signup', { session: false }), async (req, res, next) => {
    res.json(req.user)
})

router.route('/login').post(async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (!user) {
                res.send(info)
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);

                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'A_VERY_SECRET_KEY');
                return res.json({ token });
            })
        } catch (e) {
            return next(e)
        }
    })(req, res, next)
})

export default router