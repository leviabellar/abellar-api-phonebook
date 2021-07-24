import app from './server.js'
import { MongoClient } from 'mongodb'
import ContactsDAO from './dao/contactsDAO.js'

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.PB_DB_URI,
    { useNewUrlParser: true },
)
  .catch(err => {
      console.error(err.stack)
      process.exit(1)
  })
  .then(async client => {
      await ContactsDAO.injectDB(client)
      app.listen(port, () => {
          console.log(`Listening on port ${port}`)
      })
  })