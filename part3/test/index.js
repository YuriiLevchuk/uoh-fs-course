// const http = require('http')
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');


const app = express();

//mongodb defenition
const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});
const Note = mongoose.model('Note', noteSchema);

//middleware
const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method);
  console.log('Path: ', request.path);
  console.log('Body: ', request.body);
  console.log('------------');
  next()
}

const unknownEndpoint = (request,response) =>{
  response.status(404).send({ error:"unknown path" })
}

app.use(express.json());
app.use(express.static('dist'));
app.use(requestLogger);
app.use(cors());

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
  Note.find({}).then(notes => {
    response.json(notes);
  })
})

app.get('/api/notes/:id', (request ,response) => {
  const id = request.params.id;
  Note.findById(id).then(res =>{
    response.json(res);
  })
})

// delete requests
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  notes = notes.filter(note => note.id !== id);

  response.status(204).end();
})

//post requests
app.post('/api/notes', (request, response) => {
  const body = request.body

  if(!body.content){
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
  console.log(`server running on port: ${PORT}`);
})
