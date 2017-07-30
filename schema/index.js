const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

let counter = 42;

let counters = [
  10, 40, 100
];

const CounterType = new GraphQLObjectType({
  name: 'CounterType',
  fields: {
    value: {
      type: GraphQLInt,
      resolve: _ => _ // info: I can avoid this if I like
    }
  }
});

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
      type: new GraphQLList(GraphQLInt),
      resolve: () => counters
    },
    counter: {
      type: CounterType,
      resolve: () => counter
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
