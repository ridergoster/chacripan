import config from 'config'

import {
  getRegionObject,
} from './queries'

import {
  RegionType,
} from './type'

const getStoreRegion = () => ({
  type: RegionType,
  resolve(root) {
    return getRegionObject(root.region)
  },
})

export const regionConnections = {
  getStoreRegion,
}
