const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

let counter = 42;

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'world'
      },
      answer: {
        type: GraphQLInt,
        resolve: () => counter
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      incrementAnswer: {
        type: GraphQLInt,
        resolve: () => {
          counter += 1;
          return counter;
        }
      },
      incrementAnswerBy5: {
        type: GraphQLInt,
        resolve: () => {
          counter += 5;
          return counter;
        }
      }
    }
  })
});

module.exports = { schema };
