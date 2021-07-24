import { Router } from 'express'
import ContactsCtrl from './contacts.controller.js'

const router = new Router()

router
  .route('/').get(ContactsCtrl.apiGetContacts)
  .post(ContactsCtrl.apiPostContact)

export default router