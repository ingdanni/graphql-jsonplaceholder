const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

const port = process.env.port || 4000;

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(port, () => {
  console.log('Listening');
});
