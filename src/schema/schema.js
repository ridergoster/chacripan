import { storeQueries } from './store'
import { regionQueries } from './region'

import {
  GraphQLBoolean,
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql'

const QueryType = new ObjectType({
  name: 'Query',
  fields: () => ({
    keep: {
      type: GraphQLBoolean,
      resolve: () => true,
    },
    query: {
      type: QueryType,
      resolve: (...args) => args,
    },
    ...storeQueries,
    ...regionQueries,
  }),
})

export const schema = new Schema({
  query: QueryType,
})
