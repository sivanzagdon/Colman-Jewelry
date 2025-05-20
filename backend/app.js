require('dotenv').config()
const db = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const cors = require('cors') // הוספתי את הייבוא של cors

const MONGO_URI =
  'mongodb+srv://sivan0252:YDucINw2cGRBs19I@cluster0.nj84cuz.mongodb.net/'

const createApp = async function () {
  const app = express()

  app.use(
    cors({
      origin: 'http://localhost:3000', // הכתובת של הפרונטאנד שלך
      credentials: true, // מאפשר לשלוח עוגיות וסשנים
    })
  )

  app.use(express.json())
  app.use(cookieParser())
  app.use(express.urlencoded({ extended: false }))
  app.use(
    session({
      secret: 'my-secret-key',
      resave: false,
      saveUninitialized: false,
    })
  )

  app.use('/api/users', require('./routes/users'))
  app.use('/api/items', require('./routes/items'))
  app.use('/api/orders', require('./routes/orders'))

  await db.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  console.log('Database Connected!')

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(process.cwd(), 'client', 'build')))
    app.get('*', (req, res) => {
      res.sendFile(path.join(process.cwd(), 'client', 'build', 'index.html'))
    })
  }

  app.post('/api/logout', (req, res) => {
    res.clearCookie('user')
    res.clearCookie('order')
    req.session.destroy(() => {
      res.json({ message: 'Logged out successfully' })
    })
  })

  app.get('/api/check-login', (req, res) => {
    if (req.session.user || req.cookies.user) {
      res
        .status(200)
        .json({ loggedIn: true, user: req.session.user || req.cookies.user })
    } else {
      res.status(200).json({ loggedIn: false })
    }
  })

  const port = process.env.PORT || 4000
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })

  console.log('App Created!')

  return app
}

module.exports = { db, createApp }
