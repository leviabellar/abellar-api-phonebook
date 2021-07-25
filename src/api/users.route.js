import { Router } from 'express'
import UsersCtrl from './users.controller.js'
//import passport from 'passport'

import passport from './auth/auth.js'

const router = new Router()

router.route('/signup').post(passport.authenticate('signup', { session: false }), async (req, res, next) => {
    res.json(req.user)
})

export default router