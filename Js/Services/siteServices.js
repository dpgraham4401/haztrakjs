// siteServices.js
// Use the Preprod API to get RCRAInfo/e-Manifest data

const eManAPI = require('./eManAPI');

async function SiteDetails (siteID){
    try{
        const siteRes = await eManAPI.get({
            url: `./site-details/${siteID}`
        })
        console.log(siteRes.data);
    }
    catch (error) {
        console.error(error);
    }
}

async function SiteExist(siteID){
    try{
        const siteRes = await eManAPI.get( {
            url: `./site-exists/${siteID}`
        })
        console.log(siteRes.data);
        } 
    catch (error) {
        console.error(error);
    }
}

// need to debug
async function siteSearch(){
    try{
        const siteRes = await eManAPI.post( {
            url: `/site-search`,
            data: {
                "name": "Heating and Oil",
                "zip": "22033",
                "state": "VA"
            }
        })
        console.log(siteRes.data);
        } 
    catch (error) {
        console.error(error);
    }
}

module.exports.siteDeatils = SiteDetails;
module.exports.siteExists = SiteExist;

// Testing area
// const baseUrl = 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/';
const siteID  = 'VATEST000001';
const searchData = {
    "epaSiteId": 'VATEST000001'
}
const siteDate = siteSearch();