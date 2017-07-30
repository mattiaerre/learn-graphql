const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

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

module.exports = RestaurantType;
