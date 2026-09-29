import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {

	const [weatherData, setWeatherData] = useState('')

	const languages = country.languages
		? Object.values(country.languages).map(value => <li key={value} >{value}</li>)
		: <li>None</li>

	const capital = country.capital
		? (country.capital).join(', ')
		: 'n/a'

	const apiKey = import.meta.env.VITE_WEATHER_API_KEY

	const lat = country.capital? country.capitalInfo.latlng[0] : country.latlng[0]
	const lon = country.capital? country.capitalInfo.latlng[1] : country.latlng[1]

	useEffect( () => {
		axios
			.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
			.then(res => setWeatherData(res.data) )
			.catch(error => {
				console.error('There was an error in accessing the weather data', error)
			})
	}, [])

	return (
		<div>
			<h2>{country.name.common}</h2>
			<div>Capital: {capital}</div>
			<div>Area: {country.area}</div>

			<h3>Languages</h3>
				<ul>
					{languages}
				</ul>
			<img src={country.flags.png} alt={country.flags.alt? country.flags.alt : ''} width='10%' style={{ border: '1px solid grey' }} />

			<h3>Weather in {country.capital? country.capital[0] : country.name.common} </h3>
			{!weatherData
				? <p>Loading...</p>
				: (
				<div>
					<div>Temperature: {weatherData.main.temp} Fahrenheit</div>
					<img 
						src={`https://openweathermap.org/payload/api/media/file/${weatherData.weather[0].icon}.png`}
						alt={weatherData.weather[0].description} 
					/>
					<div>Wind: {weatherData.wind.speed} miles/hour</div>
				</div>
				)
			}
		</div>
	)
}

export default Country