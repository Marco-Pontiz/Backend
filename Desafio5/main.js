const express = require('express')
const Products = require('./products/products')
const { Router } = express
const router = Router()
const products = new Products(__dirname + '/data/products.json')

const app = express()
app.use(express.json())
app.use(express.static('./public'));
app.use(express.urlencoded({
    extended : true
}))

app.set('views', './views')
app.set('view engine', 'pug')
app.get('/', (req, res) => {
    return res.render('pug/form')
})

app.get('/list', (req, res) =>{
    return res.render('pug/list',{
        list: products.list
    })
})

router.post('/',(req, res) =>{
    const obj = req.body
    products.insert(obj)
    return res.redirect('/')
})

app.use('/api/productos', router)
app.listen(8080)