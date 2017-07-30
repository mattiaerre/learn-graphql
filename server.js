const express = require('express');
const { graphql } = require('graphql');
const graphqlHTTP = require('express-graphql');
const { schema, rootValue } = require('./schema/');

/*
async function executeSource(source) {
  const response = await graphql({
    schema,
    rootValue,
    source
  });
  return response;
}
*/

/*
app.use('/graphql', async (req, res) => {
  const source = req.query.source;
  const data = await executeSource(source);
  res.send(data);
});
*/

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}));

app.listen(8000);
