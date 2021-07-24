import { Router } from 'express'
import ContactsCtrl from './contacts.controller'

const router = new Router()

router.route('/').get(ContactsCtrl.apiGetContacts)

export default router