// Use the Preprod API to get RCRAInfo/e-Manifest data
require('dotenv').config()
const axios = require('axios');

axios.default.baseUrl = 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/'
const axiosGet = axios.create({
    baseURL: 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/'
});
const axiosInt = axios.create({
    baseURL: 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/auth/'
});

const baseURL = 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/';

axiosGet.interceptors.request.use(async function (config){
    const response = await axiosInt({
        method: 'get',
        url: `./${process.env.RCRAINFO_API_ID}/${process.env.RCRAINFO_API_KEY}`
    })
    config.headers.Authorization = 'Bearer ' + response.data.token
    return config
}, function (error){
    console.log(error);
});

async function getSiteExistInt(siteID){
    try{
        const siteResTest = await axiosGet( {
            method: 'get',
            url: `./site-exists/${siteID}`
        })
        console.log(siteResTest.data);
        } catch (error) {
        console.error(error);
    }
}

// testing area
const siteID  = 'VATEST000001';
const siteDate = getSiteExistInt(siteID)