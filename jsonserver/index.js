import DB from 'json-server'
const { create, router, defaults } = DB
const JsonServer = create()
const routes = router('./jsonserver/db.json')
const defaultsMiddlewares = defaults()

JsonServer.use(defaultsMiddlewares)
JsonServer.use(routes)

export default JsonServer