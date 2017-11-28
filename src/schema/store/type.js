import {
  GraphQLObjectType as ObjectType,
  GraphQLString,
} from 'graphql'

export const StoreType = new ObjectType({
  name: 'Store',
  fields: () => ({
    slug: { type: GraphQLString},
  }),
})
