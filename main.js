// crear server
const express = require('express')
const app = express()
const PORT = 8080 || process.env.PORT
// http import
const http = require('http')
const server = http.createServer(app)

//routes
const homeRouter = require('./routes/home')

//views engine require
const handlebars = require('express-handlebars')

// socket import
const {Server} = require('socket.io')
const io = new Server(server)


//public
app.use(express.static(__dirname + '/public'))

// views
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/home', homeRouter)

let  messages = []

// sockets
io.on('connection', (socket) => {
    console.log('User connected')
    socket.emit('welcome', 'Hola cliente, bienvenido')

    socket.on('newMessage', (data) => {
        console.log(data)
        messages.push(data)
        io.sockets.emit('all-messages', messages)
    })
})


server.listen(PORT, () => {
    console.log('Server running on port 8080')
})