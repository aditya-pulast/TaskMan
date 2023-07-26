const express = require('express')
require('./db/mongoose')
require('dotenv').config();

// console.log(process.env.PORT); // Verify if PORT is loaded correctly
// console.log(process.env.NAME); // Verify if NAME is loaded correctly

// Rest of your code

const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT;
// const name = process.env.NAME
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// app.listen(name, () => {
//   console.log('Server is up on port ' + name)
// })

// console.log(port)

const Task = require('./models/tasks')
const User = require('./models/user')