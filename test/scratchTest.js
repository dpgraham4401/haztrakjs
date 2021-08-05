import haztrak from '../index.js'
// import fs from 'fs'
// const fooBar = async () => {
//   const mtn = '100030514ELC'
//   const res = await haztrak.eMan.get(mtn)
//   console.log(res)
// }
// fooBar()

// const testUpdate = async () => {
//   fs.readFile('./examplesMtn.json', 'utf8', async (err, data) => {
//     if (err) {
//       console.log('error reading file')
//     } else {
//       let mtnJson = JSON.parse(data)
//       mtnJson = JSON.stringify(mtnJson)
//       const res = await haztrak.eMan.update(mtnJson)
//       console.log(res)
//     }
//   })
// }
// testUpdate()

// const testCorrect = async () => {
//   fs.readFile('./examplesMtn.json', 'utf8', async (err, data) => {
//     if (err) {
//       console.log('error reading file')
//     } else {
//       let mtnJson = JSON.parse(data)
//       mtnJson = JSON.stringify(mtnJson)
//       const res = await haztrak.eMan.correct(mtnJson)
//       console.log(res)
//     }
//   })
// }
// testCorrect()

const testMtnExists = async () => {
  const mtn = '100032135ELC'
  const res = await haztrak.eMan.exists(mtn)
  console.log(typeof res)
}
testMtnExists()

// const testSiteMtn= async () => {
//   const siteId = 'VA988177803'
//   const res = await haztrak.eMan.siteMtn(siteId)
//   console.log(res)
// }

// const testBell = async () => {
//   const bill = {
//     billId: '28391471',
//     billingAccount: 'VAD000532119'
//   }
//   const res = await haztrak.eMan.bill(bill)
//   console.log(res)
// }

// const testBillHist = async () => {
//   const bill = {
//     billingAccount: 'VAD000532119',
//     startMonthYear: '01/2021',
//     endMonthYear: '04/2021'
//   }
//   const res = await haztrak.eMan.billHistory(bill)
//   console.log(res)
// }
// testBillHist()

// const testGetManifest = async () => {
//   const mtn = '100030514ELC'
//   const res = await haztrak.eMan.get(mtn)
//   return res
// }
// const testSaveManifest = async () => {
//   let response = await testGetManifest()
//   response = JSON.stringify(response)
//   fs.writeFile('./examplesMtn.json', response, err => {
//     if (err) {
//       console.log('Error while writing', err)
//     }
//   })
// }
// testSaveManifest()

// const testCorrectionDetails = async () => {
//   const mtn = '100024722ELC'
//   const res = await haztrak.eMan.correctionDetail(mtn)
//   console.log(res)
// }
// testCorrectionDetails()

// const testCorrection = async () => {
//   const version = {
//     manifestTrackingNumber: '123456799JJK',
//     status: 'Corrected',
//     versionNumber: 2
//   }
//   const res = await haztrak.eMan.correction(version)
//   console.log(res)
// }
// testCorrection()

const testUiLink = async () => {
  const linkReq1 = {
    page: "Dashboard",
    epaSiteId: "VATEST000001"
  }
  const link1 = await haztrak.eManLink(linkReq1)
  console.log('UI Link type: ' + typeof link1)
}
testUiLink()

// const testSite = async () => {
//   const searchObj1 = {
//     name: "test tsdf",
//     state: "va",
//     siteType: "Tsdf"
//   }
//   const searchObj2 = {
//     details: 'True',
//     siteId: 'VATEST000001'
//   }
//   const searchObj3 = {
//     exist: 'True',
//     siteId: 'VATEST000001'
//   }
//   const res1 = await haztrak.site(searchObj1)
//   const res2 = await haztrak.site(searchObj2)
//   const res3 = await haztrak.site(searchObj3)
//   console.log(res1)
//   console.log(res2)
//   console.log(res3)
// }
// testSite()

const testLook = async () => {
  const densities = await haztrak.lookup('den')
  console.log(densities)
  const form = await haztrak.lookup('form')
  console.log(form)
}
testLook()
