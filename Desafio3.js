const express = require('express'); /*Requiere npm install express*/
const app = express();
const {Contenedor} = require('./Prueba');

const PORT = 8080;

const server = app.listen (PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)  /* Para iniciar... Escribir por consola: nodemode Desafio3.js*/
})
server.on("error", (error) => console.log(`Error en servidor ${error}`))

app.get('/', (req, res) =>{
    res.send('<h1>Welcome to the server express</h1>')
})

/* Retornará todos los productos*/

app.get('/productos', async (req, res) => {
    try{
        const productos = new Contenedor('producto.json')
        const todosProductos = await productos.getAll();
        res.json(todosProductos);
}catch(error){
    console.log(`Error al obtener los productos ${error}`)
    res.status(500).send('Error')
}
});


/* Retornará un producto aleatorio*/

app.get('/productoRandom', async (req, res) =>{
    try {
        const prod = new Contenedor('producto.json')
        const todosProductos = await prod.getAll();
        if(todosProductos.length > 0){
            const aleatorio = Math.floor(Math.random() * todosProductos.length);
            const productoAleatorio = todosProductos[aleatorio];
            res.json(productoAleatorio);
        } else {
            res.send('Error: No se encontraron productos!')
        }
    } catch (error) {
        console.log(`Error al obtener el producto ${error}`)
    }
})
