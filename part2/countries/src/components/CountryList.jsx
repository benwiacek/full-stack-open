import Country from "./Country"

const CountryList = ({ countriesToShow }) => {
    if (countriesToShow.length >1) {
        return (
            <div>
                {countriesToShow.map(country => <div key={country.name.common} >{country.name.common}</div>)}
            </div>
        )
    }
    console.log('single country to watch', countriesToShow)
    return (
        <div>
            <Country singleCountry={countriesToShow} />
        </div>
    )
}

export default CountryList