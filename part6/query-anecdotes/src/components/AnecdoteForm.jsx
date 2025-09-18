import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { getAnecdotes, createAnecdote } from "../requests"
import NotificationContext, { useNotificationDispatch, setNotificationForS } from "./NotificationContext"
import { useContext } from "react"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => setNotificationForS(error.response.data.error, 5, dispatch)
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    //if (content.length < 5) return null
    
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({type: "SET", payload: `a new anecdote ${content} created`})
    setTimeout(() => dispatch({type: "RESET"}), 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
