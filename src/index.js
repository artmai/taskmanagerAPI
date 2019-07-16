const app = require('./app')
const port = process.env.PORT

app.listen(port, () => {
  console.log('server is up on port ' + port)
})


// Starting Plaid integration
const plaid = require('plaid');

const plaidClient = new plaid.Client(client_id, secret, public_key, plaid.environments.sandbox, {version: '2018-05-22'});
