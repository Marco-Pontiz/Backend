/* Primer Desafío entregado {Aprobado}

class Usuario{
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    };

    getFullName = () => {
    console.log(`Su nombre completo es ${this.nombre} ${this.apellido}`)
    };

    addPet = (newPet) => {
    this.mascotas.push(newPet)
    console.log(`New pet: ${this.mascotas}`);
    };

    countPets=()=>{
    console.log(`Number of pets: ${this.mascotas.length}`);
    };

    getBook=(nombre, autor)=>{
    this.libros.push({nombre: nombre, autor: autor})
    console.log(this.libros);
    };

    getBookNames=() => {
        let nombres = [];
        for(let i = 0; i < this.libros.length; i++) {
            nombres.push(this.libros[i].nombre)
        }
    console.log(`nombres: ${nombres}`)
    }
};

const Usuario1 = new Usuario('Marco', 'Pontiz');
Usuario1.getFullName();
Usuario1.addPet("Dog");
Usuario1.addPet("Cat");
Usuario1.countPets();
Usuario1.getBook('Sherlock Holmes', 'Arthur Conan Doyle');
Usuario1.getBookNames();
*/


/* Segundo Desafío */

const { promises: fs } = require('fs');

class Contenedor{
    constructor(ruta){
        this.ruta = ruta;
    }

    async save(object){
        const objetos = await this.getAll();
        let newId
        if(objetos.length == 0){
            newId = 1;
        }else{
            const lastId = parseInt(objetos[objetos.length -1].id);
            newId = lastId + 1;
        }
        objetos.push({...object, id: newId})

        try{
            await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 1))
            return newId;
        }catch(error){
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async getById(id){
        try {
            const objetos = await this.getAll();
            const objeto = objetos.filter(item => item.id === id);
            if (objeto.length === 0) {
                return null;
            }
            return objeto[0];
        } catch (err) {
            throw new Error(err);
        }
    }

    async getAll(){
        try {
            const objetos = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objetos);
        } catch (error) {
            return []
        }
    }

    async deleteById(id){
        const objetos = await this.getAll();
        const nuevosObjetos = objetos.filter(elemento => elemento.id !== id);
        if(nuevosObjetos.length == objetos.length){
            throw new Error(`Error al borrar: No se encontró el ID: ${id}`)
        }

        try {
            await fs.writeFile(this.ruta, JSON.stringify(nuevosObjetos, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll(){
        try {
            const objetos = [];
            fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2));
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

}

const productList = new Contenedor('./producto.json');

module.exports = {Contenedor};

    /* Añadirá el elemento al producto.json*/

    /* productList.save({Title: 'Snow Kat Eco Sporty Insulated Ski Jacket (Women)', Price: '450', thumbnail: 'https://assets.peterglenn.com/jpg/1000x1000/106467_SNOW_LG.jpg'}) */

    /* Retyornará el elemento seleccionado con respecto su id, si la id seleccionada no se encuentra... retornará null en la consola*/

    /* const getElementFunction = async () => {
        console.log(await productList.getById(8))
    }
    getElementFunction(); */

    /* Retornará todos los elementos */

    /*const getAllElementsFunction = async () => {
        console.log(await productList.getAll())
    }

    getAllElementsFunction()*/

/* Eliminará el elemento cuyo id sea seleccionado*/

/*  const deleteElementFunction = async () => {
        console.log(await productList.deleteById(3))
    }
    
    deleteElementFunction() */

/* Borrar todos los elementos del producto.json*/

/*  const deleteAllElementFunction = async () => {
        console.log(await productList.deleteAll())
    }

    deleteAllElementFunction() */
