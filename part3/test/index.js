// const http = require('http')
const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

// get requests
app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response)=>{
  response.json(notes)
})

app.get('/api/notes/:id', (request ,response) => {
  const id = request.params.id;
  const note = notes.find(note => note.id === id);

  if(note) {response.json(note)}
  else{
    response.statusMessage = `element with ${id} id doesnt exist`; 
    response.status(404).end()
  }
})

// delete requests
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  notes = notes.filter(note => note.id !== id);

  response.status(204).end();
})

//post requests
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  console.log(maxId)
  return String(maxId+1)
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if(!body.content){
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = body;
  note.id = generateId();
  note.important = Boolean(body.important) || false;

  notes = notes.concat(note);
  response.json(note);
})


app.listen(PORT, ()=>{
  console.log(`server running on port: ${PORT}`);
})
