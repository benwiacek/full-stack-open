const Country = ({ country }) => {

	const languages = country.languages
		? Object.values(country.languages).map(value => <li key={value} >{value}</li>)
		: <li>None</li>

	const capital = country.capital
		? (country.capital).join(', ')
		: 'n/a'

	return (
		<div>
			<h2>{country.name.common}</h2>
			<div>Capital: {capital}</div>
			<div>Area: {country.area}</div>
			<h3>Languages</h3>
				<ul>
					{languages}
				</ul>
			<img src={country.flags.png} alt={country.flags.alt? country.flags.alt : ''} />
		</div>
	)
}

export default Country