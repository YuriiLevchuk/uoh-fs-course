import { createSlice } from "@reduxjs/toolkit"

//const getId = () => (100000 * Math.random()).toFixed(0)

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
    createAnecdote(state, action){
      return [...state, action.payload]
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const {addVoteTo, createAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer