import { useState, useEffect } from 'react'

import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import numberService from './services/numberService'


const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	useEffect(() => {
	 numberService
		.get()
		.then(res => setPersons(res.data))
	}, []) 

	const addPerson = (event) => {
		event.preventDefault()
		const personObj = {
			name: newName,
			number: newNumber
		}

		const foundContact = persons.find(person => person.name === newName)

		if (!foundContact) {
			numberService
				.create(personObj)
				.then(res => setPersons(persons.concat(res.data)))
		} else if(foundContact.number === newNumber) {
			alert(`${newName} has already been added to the phonebook`)
		} else if (window.confirm(`${newName} already exists in the phone book, do you want to replace the old number with a new one?`)) {
			numberService
				.update(foundContact.id, personObj)
				.then(res => setPersons(persons.map(person => person.id === foundContact.id ? res.data : person)))
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

	const deletePerson = id => {
		const personToDelete = persons.find(p => p.id === id)
		if (window.confirm(`Are you sure you want to delete ${personToDelete.name} ?`)) {
			numberService
				.remove(id)
				.then( res => setPersons(persons.filter(person => person.id !== res.data.id)))
		}
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
			<PersonList 
				personsToShow={personsToShow}
				deletePerson={deletePerson} 
			/>
		</div>
	)
}

export default App