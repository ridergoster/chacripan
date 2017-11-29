import config from 'config'
const agent = require('superagent-promise')(require('superagent'), Promise)

import {
  get,
  isArray,
} from 'lodash'

/**
 * Fetches all games on american eshops. Paginates every 200 games.
 * @returns {Promise<GameUS[]>} Promise containing all the games.
 */
export function getGamesAmerica(system, limit) {
  const url = config.get('url.GET_GAMES_US_URL')
  return agent.get(url)
    .query({
      limit: limit || 999,
      system: system || 'switch',
    })
    .end()
    .then((res) =>  {
      const body = JSON.parse(res.text)
      const games = get(body, 'games.game')

      return isArray(games)
        ? games
        : [games]
    })
}
