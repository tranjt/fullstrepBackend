require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('reqBody', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :total-time[digits] - :response-time ms :reqBody'))

app.get("/info", (request, response) => {
    Person.find({}).then(persons => {
        response.send(`<div>Phonebook has info for ${persons.length} people</div><br> 
    <div> ${new Date()} </div> `)        
    })
})

app.get("/api/persons", (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons.map(person => person.toJSON()))
    })
})

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person.toJSON())
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post("/api/persons", (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(400).json({
            error: "content missing"
        })
    } else if (!body.name) {
        return response.status(400).json({
            error: "name is missing"
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: "number is missing"
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        console.log(`Added ${person.name} number ${person.number} to phonebook`)
        response.json(savedPerson.toJSON())
    })
})

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})