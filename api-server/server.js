require('dotenv').config()
const api = require('./readableAPI')
const config = require('./config')

api.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})
