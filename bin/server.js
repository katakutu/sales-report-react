import config from '../config'
import server from '../server/main'

const port = config.server_port

server.listen(port)
console.log(`Server is now running at http://localhost:${port}.`)
