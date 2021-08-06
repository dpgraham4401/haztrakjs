// test.js
import haztrak from '../index.js'
import { strict as assert } from 'assert'
import fs from 'fs'

// Site services
describe('Site Services', function () {
  it('Check ID exist, returns object and contains result field', async function () {
    const siteObj1 = {
      exist: 'True',
      siteId: 'VATEST000001'
    }
    const res = await haztrak.site(siteObj1)
    assert.notEqual(res.result, undefined)
    assert.equal(typeof res, 'object')
  })
  it('site details returns object', async function () {
    const siteObj2 = {
      details: 'True',
      siteId: 'VATEST000001'
    }
    const res = await haztrak.site(siteObj2)
    assert.equal(typeof res, 'object')
  })
  it('Site search returns object with totalNumberOfSites field', async function () {
    const searchObj = {
      name: "test tsdf",
      state: "va",
      siteType: "Tsdf"
    }
    const res = await haztrak.site(searchObj)
    assert.equal(typeof res, 'object')
    assert.notEqual(res.totalNumberOfSites, undefined)
  })
})

// e-Manifest UI link
describe('e-Manifest UI Link', function () {
  it('Returns link/string to Dashboard', async function () {
    const linkReq1 = {
      page: "Dashboard",
      epaSiteId: "VATEST000001"
    }
    const link1 = await haztrak.eManLink(linkReq1)
    assert.equal(typeof link1, 'string')
  })
  it('Returns link/string to bulkSign', async function () {
    const linkReq2 = {
      page: "BulkSign",
      epaSiteId: "VATEST000001"
    }
    const link2 = await haztrak.eManLink(linkReq2)
    assert.equal(typeof link2, 'string')
  })
  it('Returns link/string to edit', async function () {
    const linkReq3 = {
      page: "Edit",
      mtn: "100028450ELC",
      epaSiteId: "VATEST000001"
    }
    const link3 = await haztrak.eManLink(linkReq3)
    assert.equal(typeof link3, 'string')
  })
})

// Get manifest
describe('GET manifest', function () {
  it('manifest JSON returned', async function () {
    const mtn = '100031335ELC'
    const res = await haztrak.eMan.get(mtn)
    assert.equal(res.manifestTrackingNumber, mtn)
  })
})

// Lookup services
describe('Lookup Services', function () {
  it('Density', async function () {
    const den = haztrak.lookup('den')
    assert.equal(typeof den, 'object')
  })
  it('Form Codes', async function () {
    const form = haztrak.lookup('form')
    assert.equal(typeof form, 'object')
  })
  it('Source Codes', async function () {
    const source = haztrak.lookup('source')
    assert.equal(typeof source, 'object')
  })
  it('state codes', async function () {
    const state = haztrak.lookup('state', 'CA')
    assert.equal(typeof state, 'object')
  })
  it('state codes', async function () {
    const fed = haztrak.lookup('fed')
    assert.equal(typeof fed, 'object')
  })
  it('Minimization codes', async function () {
    const min = haztrak.lookup('min')
    assert.equal(typeof min, 'object')
  })
  it('Port codes', async function () {
    const port = haztrak.lookup('port')
    assert.equal(typeof port, 'object')
  })
})

// Save manifest
describe('Save Manifest', function () {
  it('Save new electronic manifest', function () {
    fs.readFile('./exampleMan.json', 'utf8', async (err, data) => {
      if (err) {
        console.log('Error reading file:')
      } else {
        let manifest = JSON.parse(data)
        manifest = JSON.stringify(manifest)
        const res = await haztrak.eMan.save(manifest)
        assert.equal(typeof res, object)
      }
    })
  })
})

