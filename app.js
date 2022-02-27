import express from "express"
import cors from 'cors'
import Api from './api/index.js'
import Youtube from './youtube/index.js'
import JsonServer from './jsonserver/index.js'
const port = process.env.PORT || 5000
const App = express()

App.use(express.urlencoded({ extended: true }))
App.use(express.json())
App.use(cors())
App.get('/', (req, res) => {
    res.json({
        status: true,
        message: "Welcome to jsonBase, Register with us and enhance your application performance",
        data: null
    })
})
//api part link
App.use("/api", Api)
//youtube download part
App.use('/youtube', Youtube)
//json server part 
App.use('/json', JsonServer)


App.listen(port, () => {
    console.log(`Express app running on port ${port}`)
})