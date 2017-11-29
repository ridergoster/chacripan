import config from 'config'

import {
  GraphQLList
} from 'graphql'

import {
  RegionType,
  RegionEnum,
} from './type'

import {
  map,
} from 'lodash'

const regions = config.get('regions')

export const getRegionObject = (region) => {

  switch(region) {
    case regions.AMERICAS:
      return {
        name: 'AMERICAS',
        code: regions.AMERICAS,
      }
    case regions.EUROPE:
      return {
        name: 'EUROPE',
        code: regions.EUROPE,
      }
    case regions.ASIA:
      return {
        name: 'ASIA',
        code: regions.ASIA,
      }
    default:
      return null
  }
}

const getRegion = {
  type: RegionType,
  args: {
    code: {type: RegionEnum},
  },
  resolve(root, {code}) {
    return getRegionObject(code)
  },
}

const getRegions = {
  type: new GraphQLList(RegionType),
  resolve(root) {
    return map(regions, (region, key) => (getRegionObject(region)))
  }
}

export const regionQueries = {
  region: getRegion,
  regions: getRegions,
}
