import { Router } from "express"
import axios from "axios"

const api = Router()
const host = 'https://sbotpro.000webhostapp.com/api/v1/'
const defaultHeader = {
    'Content-Type': 'application/json'
}
const middleware = (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' })
    }
    else {
        req.query.auth = req.headers.authorization
        req.body.auth = req.headers.authorization
        next()
    }
}
const callApi = (url, method = 'get', headers = defaultHeader, reqdata = '', onsuccess, onerror) => {
    let options = {
        method: method,
        url: host + url,
        headers: headers,
        data: reqdata
    }
    axios(options)
        .then(function (response) {
            onsuccess(response.data)
            // console.log(JSON.stringify(response.data))
        })
        .catch(function (err) {
            console.log(err.toJSON())
            onerror(err)

        })
}
api.post('/login', (req, res) => {
    callApi('login', 'post', defaultHeader, req.body, (data) => {
        if (data.status)
            res.status(200).json(data)
        else
            res.status(400).json(data)
    },
        (err) => {
            res.status(400).json({
                status: false,
                data: [],
                error: err
            })
        })
})
api.use('/transactions', middleware)
api.get('/transactions', (req, res) => {
    // res.json(req)
    callApi('get-transactions', 'post', defaultHeader, req.query, (data) => {
        if (data.status)
            res.status(200).json(data)
        else
            res.status(400).json(data)
    }, (err) => {
        res.status(400).json({
            status: false,
            data: [],
            error: err
        })
    })
})
api.post('/transactions', (req, res) => {
    callApi('create-transaction', 'post', defaultHeader, req.body, (data) => {
        if (data.status)
            res.status(200).json(data)
        else
            res.status(400).json(data)
    }, (err) => {
        res.status(400).json({
            status: false,
            data: [],
            error: err
        })
    })
})


export default api