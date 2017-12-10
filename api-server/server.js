require('dotenv').config()
const app = require('./readableAPI')
const config = require('./config')

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})
