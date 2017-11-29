import {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql'

import {
  GameUSType,
} from './type'

import {
  getGamesAmerica,
} from '../../api/games'

const getAmericaGames = () => ({
  type: new GraphQLList(GameUSType),
  args: {
    system: {type: GraphQLString},
    limit: {type: GraphQLInt},
  },
  resolve(root, {system, limit}) {
    return getGamesAmerica(system, limit)
  },
})

export const gameConnections = {
  getAmericaGames: getAmericaGames
}
