const Persons = ({ personsToShow, deleteRecord }) => {
  return personsToShow.map(el => <div key={el.id}> 
    {el.name} {el.number} {'\t'}
    <button onClick={() => deleteRecord(el.id)}>x</button>
  </div>);
}

export default Persons;