import config from 'config'

import {
  regions,
} from 'country-data'

import {
  getShopsByCountryCodes,
} from './global'

/**
 * Gets all active eshops on asian countries.
 * This method will launch several requests at nintendo web services, so don't abuse it.
 * @returns {Promise<Eshop[]>} A list of shop objects with country code, name and default currency.
 */
export async function getShopsAsia() {
  return await getShopsByCountryCodes(regions.centralAsia.countries
    .concat(regions.southernAsia.countries)
    .concat(regions.southeastAsia.countries)
    .concat(regions.eastAsia.countries)
    .concat(regions.westernAsia.countries),
    config.get('gamecheck.ASIA'), config.get('regions.ASIA'))
}
