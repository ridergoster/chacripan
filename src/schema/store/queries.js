import {
  StoreType,
} from './type'

import {
  RegionEnum,
} from '../region'

import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} from 'graphql'

import {
  getShopsRegion,
} from '../../api/shops'

const findStores = {
  type: new GraphQLList(StoreType),
  args: {
    region: {type: RegionEnum},
  },
  resolve(root, {region}) {
    try {
      return getShopsRegion(region)
    }
    catch (err) {
      console.log('errorr', err)
    }
  },
}

export const storeQueries = {
  stores: findStores,
}
