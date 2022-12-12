const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Todo = require('./models/todo')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())
mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://arjunp88:banana88@cluster0.myfihzn.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('connected to mongoose')
})
.catch(() => {
    console.log('mongoose connection failed')
})

app.get('/todos', async (req, res) => {
    const todos = await Todo.find()
    res.json(todos)
})

app.post('/todos/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    })
    todo.save()
    res.json(todo)
})

app.get('/todos/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    todo.complete = !todo.complete
    todo.save()
    res.json(todo)
})

app.delete('/todos/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result)
})

app.listen(process.env.PORT || 3001, () => {
    console.log('Server started on port 3001')
})