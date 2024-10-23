const Persons = ({ personsToShow }) => {
  return personsToShow.map(el => <div key={el.id}> {el.name}  {el.number}</div>);
}

export default Persons;