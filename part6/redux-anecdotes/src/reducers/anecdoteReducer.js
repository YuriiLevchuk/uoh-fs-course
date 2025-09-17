import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers:{
    addVoteTo(state, action){
      const id = action.payload
      const anecdoteToChange = state.find(el => el.id === id)
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      return state.map(el => el.id !== id ? el : changedAnecdote)
    },
    appendAnecdote(state, action){
      return [...state, action.payload]
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})


export const {addVoteTo, setAnecdotes, appendAnecdote} = anecdoteSlice.actions

// thunk creators
export const intializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}


export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote({...anecdote, votes: anecdote.votes + 1})
    dispatch(addVoteTo(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer