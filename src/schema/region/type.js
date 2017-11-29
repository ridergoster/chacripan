import {
  GraphQLObjectType as ObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} from 'graphql'

import {
  gameConnections,
} from '../game'

import {
  storeConnections,
} from '../store'

export const RegionEnum = new GraphQLEnumType({
  name: 'RegionCode',
  description: 'Region code for continent',
  values: {
    AMERICAS: {
      value: 1,
      description: 'region code for americas'
    },
    EUROPE: {
      value: 2,
      description: 'region code for europe'
    },
    ASIA: {
      value: 3,
      description: 'region code for asia'
    },
  },
})

export const RegionType = new ObjectType({
  name: 'Region',
  description: 'Region',
  fields: () => ({
    name: { type: GraphQLString },
    code: { type: GraphQLInt },
    stores: storeConnections.getRegionStores(),
    games: gameConnections.getAmericaGames(),
  }),
})
