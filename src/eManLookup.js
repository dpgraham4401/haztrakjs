// lookServ.js

import * as eManAPI from './eManAPI.js'

/**
 * eManLookup: Lookup e-Manifest related codes.
 *
 * @param {object} eLook object containing the lookup parameters codes | shippingName | idNumber
 * @param {string} eLook.codes name, id, haz, pack, num-suffix, num-siffix-all, cont, uom, load, haz-filt, pack-filt,name-filt, or id-filt
 * @param {string} eLook.shippingName possibles values from codes='dot'
 * @param {string} eLook.idNumber possibles values from codes='id'
 * @return {object} e-Manifest (filtered) lookups
 *
 * @link  https://github.com/dpgraham4401/haztrak
 * */
async function eManLookup (eLook) {
  try {
    let codeUrl = ''
    switch (eLook.codes.toUpperCase()) {
      case 'NAME':
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
        if (eLook.shippingName && eLook.idNumber) {
          codeUrl = '/emanifest/lookup/hazard-class-by-shipping-name-id-number/' +
            eLook.shippingName + '/' + eLook.idNumber
        } else {
          throw new Error('haz-filt requires shippingName and idNumber fields')
        }
        break
      case 'PACK-FILT':
        if (eLook.shippingName && eLook.idNumber) {
          codeUrl = '/emanifest/lookup/packing-group-by-shipping-name-id-number/' +
            eLook.shippingName + '/' + eLook.idNumber
        } else {
          throw new Error('pack-filt requires shippingName and idNumber fields')
        }
        break
      case 'ID-FILT':
        if (eLook.shippingName) {
          codeUrl = '/emanifest/lookup/id-numbers-by-shipping-name/' + shippingName
        } else {
          throw new Error('id-filt requires shippingName')
        }
        break
      case 'NAME-FILT':
        if (eLook.idNumber) {
          codeUrl = '/emanifest/lookup/proper-shipping-names-by-id-number/' + idNumber
        } else {
          throw new Error('name-filt requires idNumber field')
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