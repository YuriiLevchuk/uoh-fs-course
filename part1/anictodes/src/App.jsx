import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // hooks
  const [votes, setVotes] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0})
  const [selected, setSelected] = useState(0)

  // handlers
  const selectRandomAnecdote = () => {
    setSelected(() => Math.floor(Math.random() * anecdotes.length))
  }
  const updateVotes = () => {
    setVotes(prevVotes=>{
      return { ...prevVotes, [selected] : prevVotes[selected] + 1 }
    })
  }
  //functions
  const getIndexWithMaxVotes = () => {
    let max = 0;
    let k = 0;
    for(let i = 0; i<anecdotes.length; i++){
      if (max < votes[i]){
        max = votes[i];
        k = i;
      };
    }
    return k;
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      has {votes[selected]} votes
      <br/>
      <button onClick={updateVotes}>vote</button>
      <button onClick={selectRandomAnecdote}>next anectode</button>

      <h1>Anecdote with the most votes</h1>
      {anecdotes[getIndexWithMaxVotes()]}
    </div>
  )
}

export default App