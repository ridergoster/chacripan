import Promise from 'bluebird'
import config from 'config'

import {
  countries
} from 'country-data'

import {
  getShopsAmerica
} from './america'

import {
  getShopsAsia
} from './asia'

import {
  getShopsEurope
} from './europe'

import {
  getPrice,
} from '../price'

/**
 * Gets all active eshops.
 * This method will launch several requests at nintendo web services, so don't abuse it.
 * @returns {Promise<Eshop[]>} A list of shop objects with country code, name and default currency.
 */
export async function getShopsRegion(region) {
  const regions = config.get('regions')

  switch(region) {
    case regions.AMERICAS:
      return getShopsAmerica()
      break
    case regions.ASIA:
      return getShopsAsia()
      break
    case regions.EUROPE:
      return getShopsEurope()
      break
    default:
      throw new Error("region missing")
      break
  }
}

/**
 * Gets all active eshops.
 * This method will launch several requests at nintendo web services, so don't abuse it.
 * @returns {Promise<Eshop[]>} A list of shop objects with country code, name and default currency.
 */
export async function getActiveShops() {
  const promises = [getShopsAmerica(), getShopsAsia(), getShopsEurope()]
  const shops = await new Promise.all(promises)

  return shops.spread((america, asia, eu) => america.concat(asia).concat(eu))
}

/**
 * Gets all active eshops given a list of countries.
 * @param {string[]} countryCodes A list of 2 digit country codes for every country eshop to lookup. (ISO 3166-1 alpha-2 country codes)
 * @param {string} gamecode A 14 digits game NSUID from the desired region.
 * @param {number} region A region id that will be appendend in the final shop object for filtering purposes.
 * @returns {Promise<Eshop[]>} A list of shop objects with country code, name and default currency.
 */
export async function getShopsByCountryCodes(countryCodes, gamecode, region) {
  const countryList = countryCodes.map(code => countries[code])
  const promises = []

  countryList.forEach(country => {
    promises.push(getPrice(country.alpha2, gamecode)
      .then(response => {
        response.country = country
        return response
      })
      .catch(err => {
        return null
      })
    )
  })

  const values = await new Promise.all(promises)
  const validShops = values.filter(value => value && !value.error)
  const activeShops = validShops.filter(shop => shop.prices && shop.prices.length && shop.prices[0].regular_price)

  return activeShops.map(shop => ({
    code: shop.country.alpha2,
    country: shop.country.name,
    currency: shop.prices[0].regular_price.currency,
    region: region
  }))
}
