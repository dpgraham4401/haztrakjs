// Use the Preprod API to get RCRAInfo/e-Manifest data
require('dotenv').config()
const axios = require('axios');

axios.default.baseUrl = 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/'
const axiosGet = axios.create();

const axiosInt = axios.create({
    baseUrl: 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/auth/'
});

const baseUrl = 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/';

axiosGet.interceptors.request.use(async function (config){
    const response = await axiosInt.get(`${baseUrl}auth/${process.env.RCRAINFO_API_ID}/${process.env.RCRAINFO_API_KEY}`);
    config.headers.Authorization = 'Bearer ' + response.data.token
    return config
}, function (error){
    console.log(error);
});

async function getSiteExistInt(siteID){
    const siteResTest = await axiosGet( {
        method: 'get',
        url: `${baseUrl}site-exists/${siteID}`
    })
    console.log(siteResTest.data);
}

// testing area
const siteID  = 'VATEST000001';
const siteDate = getSiteExistInt(siteID)