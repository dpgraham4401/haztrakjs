// siteServices.js
// Use the Preprod API to get RCRAInfo/e-Manifest data

const eManAPI = require('./eManAPI');

async function getSiteDetails (siteID){
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

async function getSiteExist(siteID){
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

// Testing area
const baseUrl = 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/';
const siteID  = 'VATEST000001';
const siteDate = getSiteDetails(siteID)