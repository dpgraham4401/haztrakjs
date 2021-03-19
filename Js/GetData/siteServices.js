// Use the Preprod API to get RCRAInfo/e-Manifest data
const axios = require('axios');

// Local modules
const auth = require('./auth');

const baseUrl = 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/';
const siteID  = 'VATEST000001';

async function getSiteExist(siteID){
    try{
        const tokenResp = await auth.getToken();
        const siteResponse = await axios.get(baseUrl + 'site-exists/' + siteID, {
        headers:{
            Authorization: 'Bearer ' + tokenResp.token
        }
    })
        // console.log(siteResponse.data);
        return siteResponse.data;
    }
    catch (error) {
        console.error(error);
    }
}

async function getSiteDetails(siteID){
    try{
        const tokenResp = await auth.getToken();
        const siteResponse = await axios.get(`${baseUrl}site-details/${siteID}`, {
        headers:{
            Authorization: 'Bearer ' + tokenResp.token
        }
    })
        // console.log(siteResponse.data);
        return siteResponse.data;
    }
    catch (error) {
        console.error('Error: getSiteDeatails ',error);
    }
}

// testing area
// const siteData = getSiteExist(siteID)
const siteData = getSiteDetails(siteID)