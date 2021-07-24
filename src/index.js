import app from './server.js'
import { MongoClient } from 'mongodb'
import ContactsDAO from './dao/contactsDAO.js'

const port = process.env.PORT || 8000

MongoClient.connect(
    'mongodb+srv://user001:user001-mongodb-basics@practice.54zqw.mongodb.net/test?retryWrites=true&w=majority',
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