let express = require('express');
let app = express();
let port = process.env.PORT||1234;
const bodyParser = require('body-parser');
const cors = require('cors');
let mongo = require('mongodb');
let {dbConnect,getData,postData,updateOrder,deleteWached} = require('./controller/dbController')


// MIDDLEWARE(SUPPORTING LIBRARIES)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())



// DEFINE YOUR ROUTE
app.get('/',(req,res)=>{
    res.send('Hi from express')
})

// GET YOUR LOCATION MOVIE INDUSTRY
app.get('/country',async (req,res)=>{
    let query = {}
    let collection = "country"
    let output = await getData(collection,query)
    res.send(output)
})

// GET MOVIES CATEGORIES 
app.get('/category', async (req,res)=>{
    let query = {}
    let collection = "category"
    let output = await getData(collection,query)
    res.send(output)
})

// GET ALL MOVIES 
app.get('/items',async (req,res)=>{
    let query = {}
    if(req.query.locationId){
        query = {"location_id":Number(req.query.locationId)}
    }else if (req.query.movieId){
        query = {"type_id":Number(req.query.movieId)}
    }
    else{
        query = {}
    }
    let collection = "items"
    let output = await getData(collection,query)
    res.send(output)
})

// movies with respect to category + location 
app.get('/filter/:categoryId', async (req,res)=>{
    let categoryId = Number(req.params.categoryId)
    let locationId = Number(req.query.locationId)
    if(locationId){
        query = {
            "category_id":categoryId,
            "location_id":locationId
            
        }
    }else{
        query = {}
    }
    let collection = "items"
    let output = await getData(collection,query)
    res.send(output)

})
// DETAILS 
app.get('/items/:id', async (req,res)=>{
    let id = Number(req.params.id)
    let query = {id:id}

    let collection = "items"
    let output = await getData(collection,query)
    res.send(output)
})

//movies watched
app.get('/watched', async (req,res)=>{
    let query = {}
    if(req.query.name){
        query={name:req.query.name}
    }
    else{
        query = {}
    }
    // let query = {}

    let collection = "watched"
    let output = await getData(collection,query)
    res.send(output)
})
//place order
app.post('/placeOrder', async (req,res)=>{
    let data = req.body
    let collection = "watched"
    console.log(">>>",data)
    let response = await postData(collection,data)
    res.send(response)
})

//update
app.put('/updateOrder', async (req,res)=>{
    let collection = "watched"
    let condition = {"id":Number(req.params.id)}
    let data = {
        $set:{
            "status":req.body.status
        }
    }
    let output = await updateOrder(collection,condition,data)
    res.send(output)
})


//delete movies watched
app.delete('/deleteWached', async (req,res)=>{
    let collection = "watched"
    let condition = {"id":Number(req.params.id)}
    let output = await deleteWached(collection,condition)
    res.send(output)
})

// app.get('/')

app.listen(port,(err)=>{
    dbConnect();
    if(err) throw err;
    console.log(`server is running on port ${port}`)
})