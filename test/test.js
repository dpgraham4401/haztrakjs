// test.js
import * as eMan from '../src/main.js'

// linkServices.js
// const page = 'BulkSign'
// const siteID = 'VATEST000001'
// const mtn = ['100031335ELC', '019404529JJK', '019404519JJK']
// const siteDate = eMan.eManLink(page, siteID, mtn)

describe('Site Exist', function () {
  it('returns object with site id', function () {
    eMan.siteExist('VATEST000001')
  })
})

describe('Site Details', function () {
  it('returns object with site details', function () {
    eMan.siteDetails('VATEST000001')
  })
})

describe('e-Manifest UI Link', function () {
  it('returns RCRAInfo UI link to view manifest(s)', function () {
    let page = 'BulkSign'
    const siteID = 'VATEST000001'
    let mtn = ['100031335ELC', '019404529JJK', '019404519JJK']
    eMan.eManLink(page, siteID, mtn)

    page = 'Dashboard'
    eMan.eManLink(page, siteID, mtn)

    page = 'view'
    mtn = '100031335ELC'
    eMan.eManLink(page, siteID, mtn)
  })
})

describe('e-Manifest GET', function () {
  it('request manifest data (JSON)', function () {
    const mtn = '100031335ELC'
    const attachment = 0
    eMan.eManGet(mtn, attachment)
  })
})
