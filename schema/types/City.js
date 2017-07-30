const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const CityType = new GraphQLObjectType({
  name: 'CityType',
  fields: {
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    state: {
      type: GraphQLString
    }
  }
});

module.exports = CityType;
