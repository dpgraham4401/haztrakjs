// test.js
import * as haztrak from '../index.js'

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
