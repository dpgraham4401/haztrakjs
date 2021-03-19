//Use the Preprod API to get RCRAInfo/e-Manifest data
const axios = require('axios');

// Module exports
module.exports = {getToken};

const baseUrl = 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/';
const apiId   = '9eb85033-05e4-45e1-9cbf-024140c3b047/';
const apiKey  = 'WBGKE2oB079TFEflY0y8';

async function getToken() {
    try{
       const tokenResp = await axios.get(`${baseUrl}auth/${apiId}${apiKey}`);
       return await tokenResp.data
    } 
    catch (error) {
        console.log(error);
    }
}