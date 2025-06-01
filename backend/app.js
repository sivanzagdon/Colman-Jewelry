require('dotenv').config()
const db = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const cors = require('cors')

const MONGO_URI =
  'mongodb+srv://sivan0252:YDucINw2cGRBs19I@cluster0.nj84cuz.mongodb.net/'

const createApp = async function () {
  const app = express()

  // חיבור למסד הנתונים
  await db.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  console.log('✅ Database Connected')

  // הגדרות בסיס
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
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

  // ראוטים
  app.use('/api/users', require('./routes/users'))
  app.use('/api/items', require('./routes/items'))
  app.use('/api/orders', require('./routes/orders'))

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

  // ✅ הגשת אפליקציית React (build) גם בפיתוח וגם בפרודקשן
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
  })
  // הגדרת הפורט ל־server.js
  app.set('port', process.env.PORT || 4000)

  console.log('✅ App Created')

  return app
}

module.exports = { db, createApp }
