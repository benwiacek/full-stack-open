import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryFilter from "./components/CountryFilter"
import CountryList from "./components/CountryList"

function App() {
	const [countries, setCountries] = useState([])
	const [filter, setFilter] = useState('')


	useEffect(() => {
		axios
			.get('https://studies.cs.helsinki.fi/restcountries/api/all') // general API url
			.then(res => {
				setCountries(res.data)
			})
			.catch(error => alert('There was an issue in accessing the list of countries.'))
	}, [])

	let instruction = ''

	const handleFilter = (event) => {
		setFilter(event.target.value)
	}

	const filteredCountries = countries.filter(country => 
		country.name.common.toLowerCase().includes(filter.toLowerCase())
	)

	console.log(filteredCountries)


	const countriesToShow = () => {
		if(!filter) {
			instruction = 'Please use the filter to display the results.'
		} else if(filteredCountries.length > 10) {
			instruction = 'There are too many results, try to be more specific.'
		} else if(filteredCountries.length === 0) {
			instruction = 'There is no country matching that name.'
		} else {
			instruction = ''
			return filteredCountries
		}	
	}	

	console.log(countriesToShow())

	const toDisplay = instruction
		? <div className="instruction">{instruction}</div>
		: <CountryList countriesToShow={countriesToShow()} />

	return (
		<div>
			<h1>Countries</h1>
			<CountryFilter 
				filter={filter}
				handleFilter={handleFilter}
			/>
			{toDisplay}
		</div>
	)
}

export default App
