import config from 'config'

import {
  regions,
} from 'country-data'

import {
  getShopsByCountryCodes,
} from './global'

/**
 * Gets all active eshops on american countries.
 * This method will launch several requests at nintendo web services, so don't abuse it.
 * @returns {Promise<Eshop[]>} A list of shop objects with country code, name and default currency.
 */
export async function getShopsAmerica() {
  return await getShopsByCountryCodes(regions.southAmerica.countries
    .concat(regions.centralAmerica.countries)
    .concat(regions.northernAmerica.countries),
    config.get('gamecheck.AMERICAS'), config.get('regions.AMERICAS'))
}
