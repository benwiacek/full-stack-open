import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryFilter from "./components/CountryFilter"
import CountryList from "./components/CountryList"
import Country from './components/Country'

function App() {
	const [countries, setCountries] = useState([])
	const [filter, setFilter] = useState('')
	const [selectedCountry, setSelectedCountry] = useState('')

	useEffect(() => {
		axios
			.get('https://studies.cs.helsinki.fi/restcountries/api/all')
			.then(res => {
				setCountries(res.data)
			})
			.catch(error => {
				alert('There was an issue in accessing the list of countries.')
				console.error(error)
			})
	}, [])

	const handleFilter = (event) => {
		setFilter(event.target.value)
		setSelectedCountry('')
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

	const message = instruction()

	const showCountry = (country) => {
		setSelectedCountry(country)
		setFilter('')
	}

	const toDisplay = () => {
		if(selectedCountry) return <Country country={selectedCountry} />
		if(filteredCountries.length === 1) return <Country country={filteredCountries[0]} />
		if(message) return <div className="instruction">{message}</div>
		return <CountryList countriesToShow={filteredCountries} showCountry={showCountry}/>
	}

	return (
		<div>
			<h1>Countries</h1>
			<CountryFilter 
				filter={filter}
				handleFilter={handleFilter}
			/>
			{toDisplay()}
		</div>
	)
}

export default App
