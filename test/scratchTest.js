
import haztrak from '../index.js'
// const fooBar = async () => {
//   const mtn = '100030514ELC'
//   const res = await haztrak.eMan.get(mtn)
//   console.log(res)
// }
// fooBar()

// import fs from 'fs'
// const fooBar = async () => {
//   const stateCode = 'VA'
//   const siteType = 'tsdf'
//   const res = await haztrak.eMan.sites(stateCode, siteType)
//   console.log(res)
// }

// const fooBar = async () => {
//   const mtn = '100032135ELC'
//   const res = await haztrak.eMan.exists(mtn)
//   console.log(res)
// }

// const fooBar = async () => {
//   const siteId = 'VA988177803'
//   const res = await haztrak.eMan.siteMtn(siteId)
//   console.log(res)
// }

// const fooBar = async () => {
//   const bill = {
//     billId: '28391471',
//     billingAccount: 'VAD000532119'
//   }
//   const res = await haztrak.eMan.bill(bill)
//   console.log(res)
// }

// const fooBar = async () => {
//   const bill = {
//     billingAccount: 'VAD000532119',
//     startMonthYear: '01/2021',
//     endMonthYear: '04/2021'
//   }
//   const res = await haztrak.eMan.billHistory(bill)
//   console.log(res)
// }

// const fooBar = async () => {
//   const mtn = '100030514ELC'
//   const res = await haztrak.eMan.get(mtn)
//   return res
// }
// const fooBarBar = async () => {
//   let response = await fooBar()
//   response = JSON.stringify(response)
//   fs.writeFile('./examplesMtn.json', response, err => {
//     if (err) {
//       console.log('Error while writing', err)
//     }
//   })
// }
// fooBarBar()

// const testCorrectionDetails = async () => {
//   const mtn = '100024722ELC'
//   const res = await haztrak.eMan.correctionDetail(mtn)
//   console.log(res)
// }
// testCorrectionDetails()

const testSearch = async () => {
  const searchCrit = {
    stateCode: 'VA',
    status: 'Pending',
    siteType: 'Generator'
  }
  const res = await haztrak.eMan.search(searchCrit)
  console.log(res)
}
testSearch()
