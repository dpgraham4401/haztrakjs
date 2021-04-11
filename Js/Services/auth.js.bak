//Use the Preprod API to get RCRAInfo/e-Manifest data
const axios = require('axios');
require('dotenv').config()

// Module exports
module.exports = {getToken};

const baseUrl = 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/';

async function getToken() {
    try{
       const tokenResp = await axios.get(`${baseUrl}auth/${process.env.RCRAINFO_API_ID}/${process.env.RCRAINFO_API_KEY}`);
       return await tokenResp.data
    } 
    catch (error) {
        console.log(error);
    }
}

