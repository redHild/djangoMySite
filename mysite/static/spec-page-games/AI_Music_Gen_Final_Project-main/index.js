const express = require('express')
const app = express()
const path = require('path')

// return scripts like css and js and the icon
app.get('/style.css', function(req, res) { res.sendFile(__dirname + "/style.css") })
app.get('/js/musicInf.js', function(req, res) { res.sendFile(path.join(__dirname + "/js/musicInf.js")) })
app.get('/js/midiInp.js', function(req, res) { res.sendFile(path.join(__dirname + "/js/midiInp.js")) })
app.get('/js/midiOut.js', function(req, res) { res.sendFile(path.join(__dirname + "/js/midiOut.js")) })
app.get('/icon.png', function(req, res) { res.sendFile(__dirname + "/icon.png") })

// index get and post methods
app.get('/', (req, res) => { res.sendFile(path.join(__dirname + "/index.html")) })

app.post('/', (req, res) => {
    console.log(req.body)
    res.sendFile(path.join(__dirname + "/index.html"))
})

// license page
app.get('/license', (req, res) => { res.sendFile(path.join(__dirname + "/license.html")) })

// deal with all requests that are invalid, redirect to index
app.get('*', (req, res) => { res.redirect('/') })

// start listening
app.listen(8000);