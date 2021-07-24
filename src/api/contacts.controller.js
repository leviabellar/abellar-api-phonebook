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

    static async apiPostContact(req, res, next) {
        try {
            const contact = {
                last_name: req.body.last_name,
                first_name: req.body.first_name,
                phone_numbers: req.body.phone_numbers
            }
    
            await ContactsDAO.addContact(contact)
            res.json({ status: "success", inserted: contact })
        } catch (e) {
            res.status(500).json({ e })
        }
    }

    static async apiDeleteContact(req, res, next) {
        
    }
}