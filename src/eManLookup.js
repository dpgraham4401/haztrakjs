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
    let codeUrl = ''
    switch (codes) {
      case 'dot':
        codeUrl = '/emanifest/lookup/proper-shipping-names'
        break
      case 'id':
        codeUrl = '/emanifest/lookup/id-numbers'
        break
      case 'haz':
        codeUrl = '/emanifest/lookup/hazard-classes'
        break
      case 'pack':
        codeUrl = '/emanifest/lookup/packing-groups'
        break
      case 'haz-filt':
        if (arguments.length === 3) {
          codeUrl = '/emanifest/lookup/hazard-class-by-shipping-name-id-number/' +
            shippingName + '/' + idNumber
        } else {
          throw new Error('haz-filt argument requires shippingName and idNumber arguments')
        }
        break
      case 'pack-filt':
        if (arguments.length === 3) {
          codeUrl = '/emanifest/lookup/packing-group-by-shipping-name-id-number/' +
            shippingName + '/' + idNumber
        } else {
          throw new Error('pack-filt argument requires shippingName (dot) and idNumber (id) arguments')
        }
        break
      case 'id-filt':
        if (arguments.length >= 2) {
          codeUrl = '/emanifest/lookup/id-numbers-by-shipping-name/' + shippingName
        } else {
          throw new Error('id-filt argument requires shippingName argument [2]')
        }
        break
      case 'name-filt':
        if (arguments.length >= 2) {
          codeUrl = '/emanifest/lookup/proper-shipping-names-by-id-number/' + idNumber
        } else {
          throw new Error('name-filt argument requires shippingName argument [2]')
        }
        break
      case 'num-suffix':
        codeUrl = '/emanifest/lookup/printed-tracking-number-suffixes'
        break
      case 'num-suffix-all':
        codeUrl = '/emanifest/lookup/printed-tracking-number-suffixes-ALL'
        break
      case 'cont':
        codeUrl = '/emanifest/lookup/container-type'
        break
      case 'uom':
        codeUrl = '/emanifest/lookup/quantity-uom'
        break
      case 'load':
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
    console.error(error)
  }
}

export { eManLookup }
