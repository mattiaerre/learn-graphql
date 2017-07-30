const express = require('express');
const graphqlHTTP = require('express-graphql');
const { schema, rootValue } = require('./schema/');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}));

app.listen(8000);
