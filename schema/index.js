const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
    answer: Int
  }
  type Mutation {
    incrementAnswer: Int
    incrementAnswerBy5: Int
  }

`);

let counter = 42;

const rootValue = {
  hello: () => 'world',
  answer: () => counter,
  incrementAnswer: () => {
    counter += 1;
    return counter;
  },
  incrementAnswerBy5: () => {
    counter += 5;
    return counter;
  }
};

module.exports = { schema, rootValue };
