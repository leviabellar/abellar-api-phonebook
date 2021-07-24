import { ObjectId } from "bson"
import { response } from "express"

let contacts
let pbook
const DEFAULT_SORT = [["first_name", 1]]

export default class ContactsDAO {
    static async injectDB(conn) {
        if (contacts) {
            return
        }
        try {
            pbook = await conn.db('task003')
            contacts = await conn.db('task003').collection('contacts')
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in contactsDAO: ${e}`
            )
        }
    }

    static async getContacts({
        filters = null,
        skip = 0,
        limit = 0,
    } = {}) {
        let queryParams = {}
        if (filters) {
            //to be added soon
        }
        let { query = {}, project = {}, sort = DEFAULT_SORT } = queryParams
        let cursor
        try {
            cursor = await contacts
              .find(query)
              .project(project)
              .sort(sort)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { contactList: [], totalNumContacts: 0 }
        }

        const displayCursor = cursor.limit(limit).skip(skip)

        try {
            const contactsList = await displayCursor.toArray()
            const totalNumContacts = await contacts.countDocuments(query)

            return { contactsList, totalNumContacts }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
        }
    }

    static async addContact(contact) {
        try {
            return await contacts.insertOne(contact)
        } catch (e) {
            console.error(`Unable to post contact: ${e}`)
            return { error: e }
        }
    }
}