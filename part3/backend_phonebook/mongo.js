const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.o301pix.mongodb.net/phonebook`

mongoose.set('strictQuery', false)

mongoose.connect(url, {family: 4 })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]

const person = new Person({
    name,
    number,
})

console.log(process.argv.length)

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
    
} else if(process.argv.length === 3) {
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })

} else {
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}




