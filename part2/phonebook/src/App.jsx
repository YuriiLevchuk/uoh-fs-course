import { useState, useEffect } from 'react'
import noteServices from './services/notes'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  //hooks
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchBar, setSearhBar] = useState('')

  useEffect(()=>{
    noteServices.GETrequest()
      .then(x => { setPersons(x) })
  }, [])

  //add record
  const addRecord = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const indexCheck = persons.findIndex(el => el.name === newName)
    console.log(indexCheck);
    
    if (indexCheck !== -1){
      const curId = persons[indexCheck].id;
      if(window.confirm(`Do you want to overwrite ${newName}?`)){
        noteServices.PUTrequest(newPerson, curId)
          .then(x => {
            setPersons(persons.map(el => el.id === curId ? x : el));
            setNewName('');
            setNewNumber('');
          })
      }
      return 0;
    }

    noteServices.POSTrequest(newPerson)
      .then(x => {
        setPersons(cur => cur.concat(x));
        setNewName('');
        setNewNumber('');
      })
  }

  //delete record
  const deleteRecord = (id) => {
    const currentPerson = persons.filter(el=>{ return el.id === id })[0];
    if (!window.confirm(`Do you want to delete ${currentPerson.name}`)) return 0;

    noteServices.DELETErequest(id)
      .then(x => {
        const newPersons = persons.filter(el=>{ return el.id !== id});
        setPersons(newPersons)}
    )
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

  //searchbar
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
      <Persons
        personsToShow={personsToShow}
        deleteRecord={deleteRecord}
      />
    </div>
  )
}

export default App