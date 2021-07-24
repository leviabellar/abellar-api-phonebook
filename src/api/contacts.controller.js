import ContactsDAO from '../dao/contactsDAO.js'

export default class ContactsController {
    static async apiGetContacts(req, res, next) {
        const { contactsList, totalNumContacts } = await ContactsDAO.getContacts()
        let response = {
            contacts: contactsList,
            filters: {},
            total_results: totalNumContacts,
        }
        res.json(response)
    }
}