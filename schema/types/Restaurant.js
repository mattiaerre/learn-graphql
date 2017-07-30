const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const CityType = require('./City');

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
    },
    cityId: {
      type: GraphQLInt
    },
    city: {
      type: CityType,
      resolve: async (obj, __, ctx) => { // obj, args, context, excInfo
        /*
        const response = await ctx.pgPool.query('SELECT * FROM cities WHERE id=$1', [obj.cityId]);
        return response.rows[0];
        */
        return ctx.loaders.cities.load(obj.cityId);
      }
    }
  }
});

module.exports = RestaurantType;
