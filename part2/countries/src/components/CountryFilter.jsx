const CountryFilter = ({ filter, handleFilter }) => {
    
    return (
        <div>
            Select country <input 
                value={filter}
                onChange={handleFilter}
            /> 
        </div>
    )
}

export default CountryFilter