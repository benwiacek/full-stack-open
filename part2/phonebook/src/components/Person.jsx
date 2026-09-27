import numberService from "../services/numberService"

const Person = ({ person: {name, number, id }, deletePerson}) => {
    return (
        <div>
            {name} {number} <button onClick={ () => deletePerson(id)}>delete</button> 
        </div>
    )
}

export default Person