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

	const handleFilter = (event) => {
		setFilter(event.target.value)
	}

	const filteredCountries = countries.filter(country => 
		country.name.common.toLowerCase().includes(filter.toLowerCase())
	)
	
	const instruction = () => {
		if(!filter) return 'Please use the filter to display the results.'
		if(filteredCountries.length > 10) return 'There are too many results, try to be more specific.'
		if(filteredCountries.length === 0) return 'There is no country matching that name.'
		return ''
	}
	
	console.log(filteredCountries)
	console.log(instruction())

	const toDisplay = instruction()
		? <div className="instruction">{instruction()}</div>
		: <CountryList countriesToShow={filteredCountries} />

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
