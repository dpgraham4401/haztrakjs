// test.js
import haztrak from '../index.js'
import fs from 'fs'

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
    haztrak.eMan.get(mtn, attachment)
    // Get(mtn, attachment)
  })
})

// Save manifest
describe('e-Manifest Save', function () {
  it('Save new electronic manifest', function () {
    fs.readFile('./exampleMan.json', 'utf8', async (err, data) => {
      if (err) {
        // console.log('Error reading file:')
      } else {
        let manifest = JSON.parse(data)
        manifest = JSON.stringify(manifest)
        haztrak.eMan.save(manifest)
      }
    })
  })
})

// Lookup Services
describe('Lookup density', function () {
  it('returns array of densities', function () {
    haztrak.lookup('den')
  })
})

// e-Manifest Lookup Services
describe('e-Manifest Lookup', function () {
  it('returns array DOT names', function () {
    haztrak.eManLookup('name')
  })
})
