//Use the Preprod API to get RCRAInfo/e-Manifest data
const axios = require('axios');

const baseUrl = 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/';
const apiId   = '9eb85033-05e4-45e1-9cbf-024140c3b047/';
const apiKey  = 'WBGKE2oB079TFEflY0y8';
const siteID  = 'VATEST000001';

async function getToken() {
    try{
       const response = await axios.get(baseUrl + 'auth/' + apiId + apiKey);
    } catch (error) {
        console.error(error);
    }
}
getToken();