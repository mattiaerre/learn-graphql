const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const CounterType = require('./Counter');
const RestaurantType = require('./Restaurant');
const CityType = require('./City');

const { camelizeKeys } = require('humps');

let counter = 42;

const counters = [
  { value: 10 }, { value: 40 }, { value: 100 }
];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'world'
    },
    answer: {
      type: GraphQLInt,
      resolve: () => counter
    },
    counters: {
      type: new GraphQLList(CounterType),
      resolve: () => counters
    },
    counter: {
      type: CounterType,
      resolve: () => counter
    },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      args: {
        search: {
          type: GraphQLString, defaultValue: ''
        },
        limit: {
          type: GraphQLInt, defaultValue: 200
        },
        after: {
          type: GraphQLInt, defaultValue: 0
        }
      },
      resolve: async (_, args, ctx) => { // obj, args, context, excInfo
        const response = await ctx.pgPool.query(`
        SELECT * FROM restaurants
        WHERE lower(name) like $1
        AND id > $3
        LIMIT $2
        `,
          [`%${args.search.toLowerCase()}`, args.limit, args.after]);

        return camelizeKeys(response.rows);
      }
    },
    cities: {
      type: new GraphQLList(CityType),
      resolve: async (_, __, ctx) => { // obj, args, context, excInfo
        const response = await ctx.pgPool.query('SELECT * FROM cities');

        return camelizeKeys(response.rows);
      }
    },
    resCount: {
      type: GraphQLInt,
      resolve: async (_, __, ctx) => {
        const data = await ctx.mongoDb.collection('counters').find({}).toArray();
        return data[0].restaurants;
      }
    }
  }
});

module.exports = QueryType;
