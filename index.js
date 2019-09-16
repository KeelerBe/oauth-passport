const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
require('./models/userSchema')
require('./services/passport')
require('colors')
const keys = require('./config/keys')

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
})
const app = express()

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

authRoutes(app)
app.get('/', (req, res) => res.send({ success: true }))

const PORT = process.env.PORT || 8000
app.listen(PORT, 
  () => console.log(`***** Listening on PORT ${PORT} *****` .bgCyan))

module.exports = app