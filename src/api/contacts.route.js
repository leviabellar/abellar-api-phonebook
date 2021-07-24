import { Router } from 'express'
import ContactsCtrl from './contacts.controller.js'

const router = new Router()

router
  .route('/').get(ContactsCtrl.apiGetContacts)
  .post(ContactsCtrl.apiPostContact)

router
  .route('/:_id')
  .delete(ContactsCtrl.apiDeleteContact)

export default router