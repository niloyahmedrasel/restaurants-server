const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
const { dbConnect } = require('./src/config/db')
const userRouter = require('./src/route/user')
const menuRouter = require('./src/route/menu')

app.use(express.json())
app.use(cors())
app.use('/api/user',userRouter)
app.use('/api/menu',menuRouter)

dbConnect()

app.get('/',async (req, res)=>{
    res.send('hello')
})

app.listen(port,async (req, res)=>{
    console.log('listening on port ' + port)
})