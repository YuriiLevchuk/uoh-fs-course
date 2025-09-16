import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
const AnecdoteList = ( ) => {
  const anecdotes = useSelector(({anecdotes, filter}) => 
    filter === 'ALL'
      ? anecdotes
      : anecdotes.filter(el => el.content.includes(filter))
  )
  const dispatch = useDispatch()

   const addVote = (id) => {
    dispatch(addVoteTo(id));
  }
  
  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList;