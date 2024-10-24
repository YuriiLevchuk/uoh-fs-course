import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchBar, setSearhBar] = useState('')

  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, [])

  const addRecord = (event) => {
    event.preventDefault();

    if (persons.findIndex(el => el.name === newName) !== -1){
      alert(`${newName} is already added to phonebook`);
      return 0;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1)
    };
    setPersons(cur => cur.concat(newPerson));
    setNewName('');
    setNewNumber('');
    //console.log(persons)
  }


  //handlers
  const handleNewName = (event) => {
    setNewName(event.target.value);
  }

  const handleNewNumber = event => {
    setNewNumber(event.target.value);
  }

  const handleSearchBar = event => {
    setSearhBar(event.target.value);
  }

  const personsToShow = persons.filter(el => el.name.includes(searchBar))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchBar={searchBar} handleSearchBar={handleSearchBar}/>

      <h2>Add New Record</h2>
      <PersonForm addRecord={addRecord} 
        newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App