import { storeQueries } from './store'

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
  }),
})

export const schema = new Schema({
  query: QueryType,
})
