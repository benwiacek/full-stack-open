require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

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

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body

    if(!name) {
        return res.status(400).json({error: 'The name is missing'})
    }

    if(!number) {
        return res.status(400).json({error: 'The number is missing'})
    }

    Person.find({ name })
        .then(person => {
            if(person) {
                return res.status(400).json({error: 'This person already exists in the phonebook'})
            }
        })

    const person = new Person({
        name,
        number
    })

    person.save().then(savedPerson => {
        res.status(201).json(savedPerson)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body

    if(!number) {
        return res.status(400).json({error: 'The number is missing'})
    }

    Person.findById(req.params.id)
        .then(person => {
            if(!person) {
                return res.status(404).end()
            }

            person.number = number
            
            return person.save().then(updatedPerson => {
                res.status(200).json(updatedPerson)
            })
        })
        .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if(error.name === 'CastError') {
        return res.status(400).send({error: 'malformated id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)