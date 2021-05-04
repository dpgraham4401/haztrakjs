// test.js
import * as eMan from '../src/main.js'
eMan.siteExist('VATEST000001')
const page = 'BulkSign'
const siteID = 'VATEST000001'
const mtn = ['100031335ELC', '019404529JJK', '019404519JJK']
const siteDate = eMan.eManLink(page, siteID, mtn)
