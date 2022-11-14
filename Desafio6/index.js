const express = require('express')
const { Router } = require('express')
const router = Router()
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const Container = require('./methods.js')
const file = new Container('./data/products.json')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const messages = []


file.init()
app.use(express.static('./public'))

app.get('/',(req,res) => {
    res.sendFile('index.html', {root: __dirname})
})

router.get('/',(req,res) =>{
    const elements = file.getAll()
    res.send(JSON.stringify(elements))
})

io.on('connection', (socket) =>{
    console.log('usuario conectado')
    socket.on('new_product',async (data)=>{
        await file.save(data)
        io.sockets.emit('products', data)
    })
})


io.on('connection', (socket)=>{
    socket.emit('messages', messages)
    socket.on('new_message', data =>{
        data.time = new Date().toLocaleTimeString()
        data.date = new Date().toLocaleDateString()
        messages.push(data)
        io.sockets.emit('messages', [data])
    })

})


app.use('/api/productos', router)

httpServer.listen( process.env.PORT ||3000, () => console.log('server on'))