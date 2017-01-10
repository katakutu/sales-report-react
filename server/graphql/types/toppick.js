const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const { GraphQLURL } = require('graphql-custom-types')

const TopPickItemType = new GraphQLObjectType({
  name: 'TopPickItem',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    image_url: { type: new GraphQLNonNull(GraphQLURL) },
    url: { type: new GraphQLNonNull(GraphQLURL) }
  }
})

const TopPickType = new GraphQLObjectType({
  name: 'TopPick',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    image_url: { type: new GraphQLNonNull(GraphQLURL) },
    url: { type: new GraphQLNonNull(GraphQLURL) },
    item: { type: new GraphQLList(TopPickItemType) }
  }
})

const TopPicksType = new GraphQLList(TopPickType)

const TopPickGroupType = new GraphQLObjectType({
  name: 'TopPickGroup',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    toppicks: { type: TopPicksType }
  }
})

const TopPickGroupsType = new GraphQLList(TopPickGroupType)

module.exports = {
  TopPickItemType,
  TopPickType,
  TopPicksType,
  TopPickGroupType,
  TopPickGroupsType
}
