const express = require('express')
const Products = require('./products/products')
const { Router } = express

const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended : true
}))

const router = Router()
const products = new Products(__dirname + '/data/products.json')

router.get('/', (req, res) =>{
    return res.json(products.list)
})

router.get('/:id', (req, res) =>{
    const id = req.params.id
    const obj = products.find(id)
    if(obj != null){
        return res.json(obj)
    }
    else return res.json(`no se encontro el elemento ${id}`)
})

router.post('/',(req, res) =>{
    const obj = req.body
    return res.json(products.insert(obj))
})
router.put('/:id', (req, res) =>{
    const obj = req.body
    const id = req.params.id
    const upd = products.update(id, obj)
    if(upd != null){
        return res.json(products.update(id, obj))
    }
    else return res.json({error:'el objeto no existe'})
})
router.delete('/:id', (req, res) =>{
    const id = req.params.id
    const del = products.deleteById(id)
    if( del != null ){
        del
        return res.json(`se borro el bojeto ${id}`)
    }
    else return res.json({error: 'objeto no encontrado'})
})

app.use('/api/productos', router)
app.use(express.static('./views'))

app.listen(8080)