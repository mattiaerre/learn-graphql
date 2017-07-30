const {
  GraphQLObjectType,
  GraphQLInt,
} = require('graphql');


const CounterType = new GraphQLObjectType({
  name: 'CounterType',
  fields: {
    value: {
      type: GraphQLInt,
      resolve: _ => _.value
    }
  }
});

module.exports = CounterType;
