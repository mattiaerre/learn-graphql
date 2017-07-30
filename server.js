const express = require('express');
const graphqlHTTP = require('express-graphql');
const { schema, rootValue } = require('./schema/');

const { Pool } = require('pg');
const pgPool = new Pool();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/forwardjs';

MongoClient.connect(url, (err, db) => {
  assert.equal(null, err);

  const app = express();

  app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
    context: { pgPool, mongoDb: db }
  }));

  app.listen(8000);
});
