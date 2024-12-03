const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
const path = require('path')
const { dbConnect } = require('./src/config/db')
const userRouter = require('./src/route/user')
const menuRouter = require('./src/route/menu')
const tableRouter = require('./src/route/table')

app.use(express.json())
app.use(cors())
app.use('/api/user',userRouter)
app.use('/api/menu',menuRouter)
app.use('/api/table',tableRouter)
app.use('/upload', express.static(path.join(__dirname, 'src', 'upload')));

dbConnect()

app.get('/',async (req, res)=>{
    res.send('hello')
})

app.listen(port,async (req, res)=>{
    console.log('listening on port ' + port)
})