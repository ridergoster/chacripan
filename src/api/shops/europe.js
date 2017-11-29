import config from 'config'

import {
  regions,
} from 'country-data'

import {
  getShopsByCountryCodes,
} from './global'

/**
 * Gets all active eshops on european countries.
 * Please note that South Africa and Oceania countries are included.
 * This method will launch several requests at nintendo web services, so don't abuse it.
 * @returns {Promise<Eshop[]>} A list of shop objects with country code, name and default currency.
 */
export async function getShopsEurope() {
  return await getShopsByCountryCodes(regions.northernEurope.countries
    .concat(regions.southernEurope.countries)
    .concat(regions.easternEurope.countries)
    .concat(regions.westernEurope.countries)
    .concat(regions.australia.countries)
    .concat(regions.southernAfrica.countries),
    config.get('gamecheck.EUROPE'), config.get('regions.EUROPE'))
}
