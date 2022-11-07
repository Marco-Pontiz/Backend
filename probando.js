const express = require('express');
const {Router} = express

const app = express()

//mascota function
const routerPets = new Router();

routerPets.use(express.json());

const pets = [];
routerPets.get('/', (req,res) => {
    res.send(Pets)
})

reouterPets.post('/', (req,res) => {
    const {body} = req;
    pets.push(body);
    res.send(body)
})
app.use('/mascotas', routerPets)

const people = [];
routerPeople.get('/', (req, res) => {
    const{body} = req;
    people.push(body)
    res.send(body)
}) 
app.use('/persona'. routerPeople)

const Port = 8080;
const server = app.listen(Port, () =>{
    console.log('El servidor esta corriendo')
})