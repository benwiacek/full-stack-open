const Country = ({ singleCountry }) => {

	const country = singleCountry[0]
	const langObj = country.languages
	const languages = Object.values(langObj).map(value => <li key={value} >{value}</li>)

	return (
		<div>
			<h2>{country.name.common}</h2>
			<div>Capital: {country.capital}</div>
			<div>Area: {country.area}</div>
			<h3>Languages</h3>
				<ul>
					{languages}
				</ul>
			<img src={country.flags.png} alt={country.flags.alt} />
		</div>
	)
}

export default Country