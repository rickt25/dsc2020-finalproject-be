const express = require('express');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', require('./src/routes/v1'))
app.listen(3000, () => console.log('Listening to port: 3000'));