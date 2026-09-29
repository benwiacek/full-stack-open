const CountryList = ({ countriesToShow, showCountry }) => {
    return (
        <div>
            {countriesToShow.map(country => {
                return (
                    <div key={country.name.common} >
                        {country.name.common} <button onClick={() => showCountry(country)}>Show</button>
                    </div>
                )
            })}
        </div>
    )
}

export default CountryList