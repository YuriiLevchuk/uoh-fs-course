import PropTypes from "prop-types"

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'important' : 'not important'

  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{ label }</button>
    </li>
  )
}

Note.propTypes = {
  note: PropTypes.object.isRequired
}

export default Note