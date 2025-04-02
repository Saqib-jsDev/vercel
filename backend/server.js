 const express = require('express');
 const app = express();
 const notes = require('./data/notes')

app.get("/",(req,res)=>{
    res.send('hello world 2')
})
app.get('/api/notes',(req,res)=>{
    res.json(notes)
})
app.get('/api/notes/:id',(req,res)=>{
  const   note = notes.find(note=>note._id===req.params.id)
  res.json(note)
})

 app.listen(3035,console.log('server is running at 3035 and watching'))  