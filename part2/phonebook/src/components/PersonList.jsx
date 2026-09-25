import Person from './Person'

const PersonList = ({ personsToShow }) => {
	return (
		<div>
			{personsToShow.map( person =>
				<Person key={person.name} person={person} />
			)}
		</div>
	)
}

export default PersonList