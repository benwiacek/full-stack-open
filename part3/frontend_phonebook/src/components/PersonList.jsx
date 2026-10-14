import Person from './Person'

const PersonList = ({ personsToShow, deletePerson }) => {
	return (
		<div className="person-list">
			{personsToShow.map( person =>
				<Person 
					key={person.name}
					person={person}
					deletePerson={deletePerson}
				/>
			)}
		</div>
	)
}

export default PersonList