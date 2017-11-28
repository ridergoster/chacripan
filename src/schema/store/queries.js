import {
  StoreType,
} from './type'

import {
  GraphQLString,
} from 'graphql'

const findBySlug = {
  type: StoreType,
  args: {
    slug: {type: GraphQLString},
  },
  resolve(root, {slug}) {
    return {
      'slug': slug
    }
  },
}

export const storeQueries = {
  store: findBySlug,
}
