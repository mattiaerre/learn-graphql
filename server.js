const express = require('express');
const graphqlHTTP = require('express-graphql');
const { schema, rootValue } = require('./schema/');

const DataLoader = require('dataloader');

const pgDb = require('./pgDb');

const { Pool } = require('pg');
const pgPool = new Pool();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/forwardjs';

MongoClient.connect(url, (err, db) => {
  assert.equal(null, err);

  const app = express();

  app.use('/graphql', (req, res) => {
    const loaders = {
      cities: new DataLoader(keys => pgDb(pgPool).fetchCities(keys)),
      counters: new DataLoader(async () => db.collection('counters').find({}).toArray())
    };

    graphqlHTTP({
      schema,
      rootValue,
      graphiql: true,
      context: { pgPool, mongoDb: db, loaders }
    })(req, res);
  });

  app.listen(8000);
});
