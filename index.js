const express = require('express')
require('colors')

const app = express()

app.get('/', (req, res) => res.send({ success: true }))

const PORT = process.env.PORT || 8000
app.listen(PORT, 
  () => console.log(`***** Listening on PORT ${PORT} *****` .bgCyan))