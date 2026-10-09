const express = require('express')
const app = express()

const PORT = 3001

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
        console.log(person)
        res.json(person)
    }
})

app.get('/info', (req, res) => {
    const statusText = `
        Phonebook has info for ${persons.length} people. <br /><br />
        ${(new Date()).toString()}
    `
    console.log(statusText)
    res.send(statusText)
})

app.listen(PORT)
console.log(`Server is running on port ${PORT}`)