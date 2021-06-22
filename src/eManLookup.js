// lookServ.js

import * as eManAPI from './eManAPI.js'

/**
 * Lookup for e-Manifest related codes
 *
 * @param {string} codes dot, id, haz, pack, num-suffix, num-siffix-all, cont, uom, load, haz-filt, pack-filt,name-filt, or id-filt
 * @param {string} shippingName possibles values from codes='dot'
 * @param {string} idNumber possibles values from codes='id'
 * */
async function eManLookup (codes, shippingName, idNumber) {
  try {
    codes = codes.toUpperCase()
    let codeUrl = ''
    switch (codes) {
      case 'DOT':
        codeUrl = '/emanifest/lookup/proper-shipping-names'
        break
      case 'ID':
        codeUrl = '/emanifest/lookup/id-numbers'
        break
      case 'HAZ':
        codeUrl = '/emanifest/lookup/hazard-classes'
        break
      case 'PACK':
        codeUrl = '/emanifest/lookup/packing-groups'
        break
      case 'HAZ-FILT':
        if (arguments.length === 3) {
          codeUrl = '/emanifest/lookup/hazard-class-by-shipping-name-id-number/' +
            shippingName + '/' + idNumber
        } else {
          throw new Error('haz-filt argument requires shippingName and idNumber arguments')
        }
        break
      case 'PACK-FILT':
        if (arguments.length === 3) {
          codeUrl = '/emanifest/lookup/packing-group-by-shipping-name-id-number/' +
            shippingName + '/' + idNumber
        } else {
          throw new Error('pack-filt argument requires shippingName (dot) and idNumber (id) arguments')
        }
        break
      case 'ID-FILT':
        if (arguments.length >= 2) {
          codeUrl = '/emanifest/lookup/id-numbers-by-shipping-name/' + shippingName
        } else {
          throw new Error('id-filt argument requires shippingName argument [2]')
        }
        break
      case 'NAME-FILT':
        if (arguments.length >= 2) {
          codeUrl = '/emanifest/lookup/proper-shipping-names-by-id-number/' + idNumber
        } else {
          throw new Error('name-filt argument requires shippingName argument [2]')
        }
        break
      case 'NUM-SUFFIX':
        codeUrl = '/emanifest/lookup/printed-tracking-number-suffixes'
        break
      case 'NUM-SUFFIX-ALL':
        codeUrl = '/emanifest/lookup/printed-tracking-number-suffixes-ALL'
        break
      case 'CONT':
        codeUrl = '/emanifest/lookup/container-type'
        break
      case 'UOM':
        codeUrl = '/emanifest/lookup/quantity-uom'
        break
      case 'LOAD':
        codeUrl = '/emanifest/lookup/load-types'
        break
      default:
        throw new Error('Unknown lookup ' + codes + ' [' + shippingName + '/' + idNumber + '] ' +
          'see documentaiton https://github.com/dpgraham4401/haztrak')
    }
    // console.log(codeUrl)
    const res = await eManAPI.get({
      url: codeUrl
    })
    // console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error.message)
    console.error(error.response.data)
  }
}

export { eManLookup }
