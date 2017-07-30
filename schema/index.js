const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} = require('graphql');

let counter = 42;

const QueryType = require('./types/Query');
const RestaurantType = require('./types/Restaurant');
const pgDb = require('../pgDb');

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
    },
    insertRestaurant: {
      type: RestaurantType,
      args: {
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        cityId: { type: GraphQLInt }
      },
      resolve: (_, args, ctx) => {
        return pgDb(ctx.pgPool).insertRestaurant(args);
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});

module.exports = { schema };
