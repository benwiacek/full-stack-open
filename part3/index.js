const express = require('express')
const morgan = require('morgan')
const app = express()

const PORT = 3001

app.use(express.json())

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        id: '1',
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: '2',
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: '3',
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: '4',
        name: 'Mary Poppendieck',
        number: '39-23-6423122'
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
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

    if(!name) {
        return res.status(400).json({error: 'The name is missing'})
    }

    if(!number) {
        return res.status(400).json({error: 'The number is missing'})
    }

    const filter = persons.find(p => p.name === name)

    if(filter) {
        return res.status(400).json({error: 'There is already a contact with this name.'})
    }

    const person = {
        id: (Math.floor(Math.random()*10000)).toString(),
        name,
        number
    }
    persons = persons.concat(person)
    res.json(persons)
})

app.listen(PORT)
console.log(`Server is running on port ${PORT}`)