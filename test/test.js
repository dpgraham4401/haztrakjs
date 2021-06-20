// test.js
import haztrak from '../index.js'

// Site exist
describe('Site Exist', function () {
  it('returns object with site id', function () {
    haztrak.siteExist('VATEST000001')
  })
})

// Site details
describe('Site Details', function () {
  it('returns object with site details', function () {
    haztrak.siteDetails('VATEST000001')
  })
})

// e-Manifest UI link
describe('e-Manifest UI Link', function () {
  it('returns RCRAInfo UI link to view manifest(s)', function () {
    let page = 'BulkSign'
    const siteID = 'VATEST000001'
    let mtn = ['100031335ELC', '019404529JJK', '019404519JJK']
    haztrak.eManLink(page, siteID, mtn)

    page = 'Dashboard'
    haztrak.eManLink(page, siteID, mtn)

    page = 'view'
    mtn = '100031335ELC'
    haztrak.eManLink(page, siteID, mtn)
  })
})

// Get manifest
describe('e-Manifest GET', function () {
  it('request manifest data (JSON)', function () {
    const mtn = '100031335ELC'
    const attachment = 0
    haztrak.eManGet(mtn, attachment)
  })
})

// Lookup Services
describe('Lookup density', function () {
  it('returns array of densities', function () {
    haztrak.lookup('den')
  })
})

// e-Manifest Lookup Services
describe('Lookup DOT shipping names', function () {
  it('returns array of haz mat names', function () {
    eMan.eManLookup('name')
  })
})

describe('Lookup DOT ID numbers', function () {
  it('returns array of DOT ID numbers', function () {
    eMan.eManLookup('id')
  })
})

describe('Lookup DOT hazardous classes', function () {
  it('returns array of DOT haz classes', function () {
    eMan.eManLookup('haz')
  })
})

describe('Lookup DOT packing groups', function () {
  it('returns array of DOT packing groups', function () {
    eMan.eManLookup('pack')
  })
})

describe('find the appropriate DOT hazardous class by shipping name and ID', function () {
  it('returns object with correct DOT haz class', function () {
    eMan.eManLookup('haz-filt', 'Acetal', 'UN1088')
  })
})

describe('find the appropriate DOT packing group by shipping name and ID', function () {
  it('returns object of correct DOT packing group', function () {
    eMan.eManLookup('haz-filt', 'Acetal', 'UN1088')
  })
})

describe('find the correct DOT ID number by shipping name', function () {
  it('returns object of correct ID', function () {
    eMan.eManLookup('id-filt', 'Acetal')
  })
})

describe('find the correct DOT shipping name by ID', function () {
  it('returns object with correct shipping name', function () {
    eMan.eManLookup('name-filt', 'UN1088')
  })
})

describe('Lookup allowable MTN suffixes', function () {
  it('returns array of suffixes allowed on the MTN', function () {
    eMan.eManLookup('num-suffix')
  })
})

describe('Lookup RCRA container types', function () {
  it('returns array of container types values', function () {
    eMan.eManLookup('cont')
  })
})

describe('Lookup RCRA quantity units of measurement', function () {
  it('returns array of UOM', function () {
    eMan.eManLookup('uom')
  })
})

describe('Lookup PCB load type', function () {
  it('returns array of PCB load types', function () {
    eMan.eManLookup('load')
  })
})
