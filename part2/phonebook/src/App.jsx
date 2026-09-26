import axios from 'axios'
import { useState, useEffect } from 'react'

import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'



const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	useEffect(() => {
	  axios
		.get('http://localhost:3001/persons')
		.then(res => setPersons(res.data))
	
	}, [])
	 

	const addPerson = (event) => {
		event.preventDefault()
		const personObj = {
		name: newName,
		number: newNumber
		}

		if(persons.some(person => person.name === newName)) {
		alert(`${newName} has already been added to the phonebook`)
		} else {
		setPersons(persons.concat(personObj))
		}
		setNewName('')
		setNewNumber('')
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleFilter = (event) => {
		setFilter(event.target.value)
	}

	const personsToShow = filter 
		? persons.filter( person => 
		person.name.toLowerCase().includes(filter.toLowerCase())
		)
		: persons

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter 
				filter={filter}
				handleFilter={handleFilter}
			/>

			<h3>Add a new person</h3>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
			/>

			<h3>Numbers</h3>
			<PersonList personsToShow={personsToShow} />
		</div>
	)
}

export default App