import {
  GraphQLObjectType as ObjectType,
  GraphQLString,
} from 'graphql'

import {
  regionConnections,
} from '../region'

export const StoreType = new ObjectType({
  name: 'Store',
  fields: () => ({
    code: { type: GraphQLString },
    country: { type: GraphQLString },
    currency: { type: GraphQLString },
    region: regionConnections.getStoreRegion(),
  }),
})
