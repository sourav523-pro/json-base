import DB from 'json-server'
const { create, router, defaults } = DB
const JsonServer = create()
const routes = router('./jsonserver/db.json')
const defaultsMiddlewares = defaults()

let clientId = 'cdhbuytgexjnuui2tb1635x64j3cio2y8c7596qn9vt46'
let clientSecret = '$2y$10$vYTbtswPm6aeZsMQRcvjCeKAoN.NmV4YYcvhwr4TciEcN7lmubujC'
const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ status: false, message: 'Missing Authorization Header' })
    }
    // verify auth credentials
    let base64Credentials = req.headers.authorization.split(' ')[1]
    let credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    let [identity_token, auth_token] = credentials.split(':')
    if (clientId == identity_token, clientSecret == auth_token) {
        next()
    } else {
        res.status(401).json({
            status: false,
            message: "You are unauthorized",
            data: credentials
        })
    }
}

JsonServer.use(authMiddleware)
JsonServer.use(defaultsMiddlewares)
JsonServer.use(routes)

export default JsonServer