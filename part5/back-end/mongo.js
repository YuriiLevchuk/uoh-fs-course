const mongoose = require('mongoose')

const url = ':)'

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  })

  const Note = mongoose.model('Note', noteSchema)

  
  const note = new Note({
    content: 'CSS is y',
    important: false,
  })

  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  
  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
})
