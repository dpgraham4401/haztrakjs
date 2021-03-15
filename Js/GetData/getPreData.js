//Use the Preprod API to get RCRAInfo/e-Manifest data

//Using the axios library
const axios = require('axios');

//base url and variables
let baseUrl = 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/';
let apiId   = '9eb85033-05e4-45e1-9cbf-024140c3b047/';
let apiKey  = 'WBGKE2oB079TFEflY0y8';
let siteID  = 'VATEST000001';

let url = baseUrl + apiId + apiKey;

// get session token returns an onbect with the session token 
// and expiration in ___ format
async function getPreToken() {
    let response = await axios.get(baseUrl + 'auth/' + apiId + apiKey);

    console.log(response);

    //create objecto return
    let sessionData = {
        sessionToken : response.data.token,
        expiration : response.data.expiration
    }
    return sessionData;
}

async function useToken(){
    let sessionData = await getPreToken();
    // console.log(sessionData);

    let siteUrl = baseUrl + 'site-exists/' + siteID;
    // console.log(siteUrl);

    // let siteResponse = await axios.get(siteUrl, {
    //     headers:{
    //         token : sessionData.sessionToken
    //     }
    // }).catch(console.log);
}
useToken();

// let response = await axios(siteUrl, {
//     headers:{
//         token : sessionData.sessionToken
//     },
// });