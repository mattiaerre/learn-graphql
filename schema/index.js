const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

let counter = 42;

const counters = [
  { value: 10 }, { value: 40 }, { value: 100 }
];

const { Pool } = require('pg');

const CounterType = new GraphQLObjectType({
  name: 'CounterType',
  fields: {
    value: {
      type: GraphQLInt,
      resolve: _ => _.value
    }
  }
});

const RestaurantType = new GraphQLObjectType({
  name: 'RestaurantType',
  fields: {
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    address: {
      type: GraphQLString
    }
  }
});

const pool = new Pool();

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
      resolve: async () => {
        const response = await pool.query('SELECT * FROM restaurants');
        return response.rows;
      }
    }
  }
});

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
