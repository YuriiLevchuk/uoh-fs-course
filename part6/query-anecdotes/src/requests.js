import axios from "axios";

export const getAnecdotes = () => 
  axios.get('http://localhost:3001/anecdotes').then(res => res.data)

export const createAnecdote = (anecdote) => {
  if (!anecdote.content || anecdote.content.length < 5) {
    console.log("new record rejected")
    return Promise.reject({
      response: {
        status: 400,
        data: { error: 'content is too short' }
      }
    })
  } 
  return axios.post('http://localhost:3001/anecdotes', anecdote).then(res => res.data)
}


export const updateAnecdote = (anecdote) => 
  axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote).then(res => res.data)