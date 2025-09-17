import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteList = ( ) => {
  const anecdotes = useSelector(({anecdotes, filter}) => 
    filter === 'ALL'
      ? anecdotes
      : anecdotes.filter(el => el.content.includes(filter))
  )
  const dispatch = useDispatch()

   const addVote = (id) => {
    dispatch(voteAnecdote(
      anecdotes.find(a => a.id === id)
    ));

    dispatch(setNotification(`You added vote to "${anecdotes.find(el => el.id === id).content}"`, 5));
  }
  
  return (
    <div>
      {[...anecdotes]
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