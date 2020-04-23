const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

morgan.token('reqBody', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :total-time[digits] - :response-time ms :reqBody'))

let persons =
    [
        {
            name: "Arto Hellas",
            number: "040-123456",
            id: 1
        },
        {
            name: "Ada Lovelace",
            number: "39-44-5323523",
            id: 2
        },
        {
            name: "Dan Abramov",
            number: "12-43-234345",
            id: 3
        },
        {
            name: "Mary Poppendieck",
            number: "39-23-6423122",
            id: 4
        }
    ]

app.get("/info", (request, response) => {
    response.send(`<div>Phonebook has info for ${persons.length} people</div><br> 
    <div> ${new Date()} </div> `)

})

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    let newId
    do {
        newId = Math.floor(Math.random() * Math.floor(10000000))
    } while (persons.find(id => id === newId))

    return newId
}

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
    } else if (persons.find(p =>
        p.name.toLocaleLowerCase() === body.name.toLocaleLowerCase())) {
        return response.status(400).json({
            error: "name already exist"
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})