import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = ({addNew, setNotification}) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.inputAttr.value,
      author: author.inputAttr.value,
      indo: info.inputAttr.value,
      votes: 0
    })
    console.log(content.inputAttr)
    navigate('/')

    setNotification(`Created a new anecdote "${content.inputAttr.value}"`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...(content.inputAttr)} />
        </div>
        <div>
          author
          <input {...(author.inputAttr)} />
        </div>
        <div>
          url for more info
          <input {...(info.inputAttr)} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={() => {
          content.reset()
          author.reset()
          info.reset()
        }}>reset</button>
      </form>
      
    </div>
  )
}

export default CreateNew