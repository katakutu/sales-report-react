const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} = require('graphql');

const tickerType = new GraphQLObjectType({
    name: 'Ticker',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        title: {
            type: GraphQLString
        },
        message: {
            type: GraphQLString
        }
    }
});

module.exports = tickerType