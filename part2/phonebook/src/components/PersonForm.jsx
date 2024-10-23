const PersonForm = ({addRecord, newName, handleNewName, newNumber, handleNewNumber}) => {
  return (
    <form onSubmit={ addRecord }>

        <div>
          <label>name:</label>
          <input 
            onChange={handleNewName}
            value={newName}
          />
        </div>

        <div>
          <label>number:</label>
          <input 
            onChange={handleNewNumber}
            value={newNumber}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>

    </form>
  )
}

export default PersonForm;