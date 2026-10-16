require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = []

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)

    if(!person) {
        res.status(404).end()
    } else {
        res.json(person)
    }
})

app.get('/info', (req, res) => {
    const statusText = `
        Phonebook has info for ${persons.length} people. <br /><br />
        ${(new Date()).toString()}
    `

    res.send(statusText)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body

    // if(!name) {
    //     return res.status(400).json({error: 'The name is missing'})
    // }

    // if(!number) {
    //     return res.status(400).json({error: 'The number is missing'})
    // }

    // const filter = persons.find(p => p.name === name)

    // if(filter) {
    //     return res.status(400).json({error: 'There is already a contact with ggggggggggggggggggggg this name.'})
    // }

    const person = new Person({
        name,
        number
    })

    person.save().then(savedPerson => {
        res.status(201).json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)