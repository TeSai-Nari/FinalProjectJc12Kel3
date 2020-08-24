const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const cors=require('cors')
const bearertoken=require('express-bearer-token')
const PORT=5000

app.use(cors())
app.use(bearertoken())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'))

app.get('/',(req,res)=>{
    return res.send('<h1>Welcome to Final Project JC12</h1>')
})

const {AuthRouters, ProductRouters, TransactionRouters}=require('./routers')

app.use('/users',AuthRouters)
app.use('/product',ProductRouters)
app.use('/transaction',TransactionRouters)

app.listen(PORT,()=>console.log('server is running on '+PORT))

