//Use the Preprod API to get RCRAInfo/e-Manifest data
const axios = require('axios');

const baseUrl = 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/';
const apiId   = '9eb85033-05e4-45e1-9cbf-024140c3b047/';
const apiKey  = 'WBGKE2oB079TFEflY0y8';
const siteID  = 'VATEST000001';

async function getToken() {
    try{
       const tokenResp = await axios.get(baseUrl + 'auth/' + apiId + apiKey);
       return await tokenResp.data

       console.log(tokenResp.data.token);
    } 
    catch (error) {
        console.log(error);
    }
}

async function getSiteExist(siteID){
    try{
        const tokenResp = await getToken();

        const siteResp = await axios.get(baseUrl + 'site-exits/' + siteID, {
        headers:{
            Authorization: 'Bearer ' + tokenResp.token
        }})
        return siteResp.data;
    }
    catch (error) {
        // console.error(error);
    }
}

getSiteExist(siteID)