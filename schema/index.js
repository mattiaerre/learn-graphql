const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
} = require('graphql');

let counter = 42;

const QueryType = require('./types/Query');

const MutationType = new GraphQLObjectType({
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
    },
    incrementAnswerBy: {
      type: GraphQLInt,
      args: {
        increment: {
          type: GraphQLInt
        }
      },
      resolve: (_, args) => {
        counter += args.increment;
        return counter;
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});

module.exports = { schema };
