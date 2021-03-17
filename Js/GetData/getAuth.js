//Use the Preprod API to get RCRAInfo/e-Manifest data

const axios = require('axios');
const fs = require('fs').promises;

let baseUrl = 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/';
let apiId   = '9eb85033-05e4-45e1-9cbf-024140c3b047/';
let apiKey  = 'WBGKE2oB079TFEflY0y8';
let siteID  = 'VATEST000001';

async function getPreToken() {
    let response = await axios.get(baseUrl + 'auth/' + apiId + apiKey);

    let stringifiedData = JSON.stringify(response.data);
    let straitData = response.data;

    let siteUrl = baseUrl + 'site-exists/' + siteID;

    let siteResponse = await axios.get(siteUrl, {
        headers:{
            Authorization: 'Bearer ' + response.data.token
        }
    }).catch(console.log);

    console.log(siteResponse.data);
}

getPreToken();






// async function useToken(){
    // let sessionData = await getPreToken();

    // let siteUrl = baseUrl + 'site-exists/' + siteID;
    // console.log(siteUrl);

    // write response to file

    // let siteResponse = await axios.get(siteUrl, {
    //     headers:{
    //         token : sessionData.sessionToken
    //     }
    // }).catch(console.log);
// }
// useToken();