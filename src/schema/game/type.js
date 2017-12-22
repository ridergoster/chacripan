import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType as ObjectType,
  GraphQLString,
} from 'graphql'

import {
  get,
  isArray,
} from 'lodash'

export const GameUSType = new ObjectType({
  name: 'GameUS',
  description: 'Game from america',
  fields: () => ({
    buyitnow: {type: GraphQLBoolean},
    buyonline: {type: GraphQLBoolean},
    caPrice: {
      type: GraphQLString,
      resolve: async (root) => {
        return get(root, 'ca_price')
      },
    },
    categories: {
      type: new GraphQLList(GraphQLString),
      resolve: async (root) => {
        const categories = get(root, 'categories.category')
        return isArray(categories) ? categories : [categories]
      },
    },
    digitaldownload: {type: GraphQLBoolean},
    eshopPrice: {
      type: GraphQLString,
      resolve: async (root) => {
        return get(root, 'eshop_price')
      },
    },
    freeToStart: {
      type: GraphQLBoolean,
      resolve: async (root) => {
        return get(root, 'free_to_start')
      },
    },
    frontBoxArt: {
      type: GraphQLString,
      resolve: async (root) => {
        return get(root, 'front_box_art')
      },
    },
    gameCode: {
      type: GraphQLString,
      resolve: async (root) => {
        return get(root, 'game_code')
      },
    },
    id: {type: GraphQLString},
    nsuid: {type: GraphQLString},
    numberOfPlayers: {
      type: GraphQLString,
      resolve: async (root) => {
        return get(root, 'number_of_players')
      },
    },
    releaseDate: {
      type: GraphQLString,
      resolve: async (root) => {
        return get(root, 'release_date')
      },
    },
    slug: {type: GraphQLString},
    system: {type: GraphQLString},
    title: {type: GraphQLString},
    videoLink: {
      type: GraphQLString,
      resolve: async (root) => {
        return get(root, 'video_link')
      },
    },
  })
})
