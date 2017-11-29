import config from 'config'

import {
  GraphQLList,
} from 'graphql'

import {
  StoreType,
} from './type'

import {
  getShopsRegion,
} from '../../api/shops'

const getRegionStores = () => ({
  type: new GraphQLList(StoreType),
  resolve(root) {
    return getShopsRegion(root.code)
  }
})

export const storeConnections = {
  getRegionStores,
}
