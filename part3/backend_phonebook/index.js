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

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(result => {
      if(!result) {
        return res.status(404).json({ error: 'There is no person with this id.' })
      }
      res.json(result)
    })
    .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  Person.find({})
    .then(result => {
      const statusText = `
        Phonebook has info for ${result.length} people. <br /><br />
        ${(new Date()).toString()}
      `
      res.send(statusText)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  Person.find({ name })
    .then(result => {
      if(result.length > 0) {
        return res.status(400).json({ error: 'This person already exists in the phonebook' })
      }

      const person = new Person({
        name,
        number
      })

      return person.save()
        .then(savedPerson => {
          res.status(201).json(savedPerson)
        })
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { number } = req.body

  Person.findById(req.params.id)
    .then(person => {
      if(!person) {
        return res.status(404).end()
      }

      person.number = number

      return person.save()
        .then(updatedPerson => {
          res.status(200).json(updatedPerson)
        })
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return res.status(400).json({ error: 'malformated id' })
  } else if(error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)