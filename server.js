
require("dotenv").config()

const { PORT = 3001, DATABASE_URL } = process.env
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

//Middleware

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

///////////////////////////////
// MODELS
////////////////////////////////
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    release:Date,
    description: String,
  })
  
const People = mongoose.model("People", PeopleSchema)

mongoose.connect(DATABASE_URL)
// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to MongoDB"))
  .on("close", () => console.log("You are disconnected from MongoDB"))
  .on("error", (error) => console.log(error))

///////////////////////////////
// ROUTES
////////////////////////////////

app.get("/", (req, res) => {
  res.send("Welcome to the Sneaker Page")
})


//  INDEX ROUTE
app.get("/sneakers", async (req, res) => {
    try {
    
      res.json(await Sneakers.find({}))
    } catch (error) {
      
      res.status(400).json(error)
    }
  })
  
  //  CREATE ROUTE
  app.post("/sneakers", async (req, res) => {
    try {
      // send all sneakers 
      res.json(await Sneakers.create(req.body))
    } catch (error) {
    
      res.status(400).json(error)
    }
  })
  
  //  DELETE ROUTE
  app.delete("/sneakers/:id", async (req, res) => {
    try {
      
      res.json(await Sneakers.findByIdAndDelete(req.params.id))
    } catch (error) {
      
      res.status(400).json(error)
    }
  })
  
  //  UPDATE ROUTE
  app.put("/sneakers/:id", async (req, res) => {
    try {
      
      res.json(
        await Sneakers.findByIdAndUpdate(req.params.id, req.body, { new: true })
      )
    } catch (error) {
    
      res.status(400).json(error)
    }
  })

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))