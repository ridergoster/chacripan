import config from 'config'
const agent = require('superagent-promise')(require('superagent'), Promise)

/**
 * Get pricing information for the requested games. Paginates every 50 games.
 * @param {string} country A two digit country code. (ISO 3166-1 alpha-2 country code)
 * @param {string} gameIds One or more NSUID of the corresponding games.
 * @return {Promise<PriceResponse>} A promise containing the pricing information.
 */
export function getPrice(country, gameId) {
  const url = config.get('url.GET_PRICE_URL')

  return agent.get(url)
    .query({
      country: country,
      lang: 'en',
      ids: gameId,
    })
    .end()
    .then((res) => (res.body))
}
