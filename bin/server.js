const config = require('../config')
const server = require('../server/main')
const port = config.server_port

server.listen(port)
console.log(`Server is now running at http://localhost:${port}.`)
