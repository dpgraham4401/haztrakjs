// Use the Preprod API to get RCRAInfo/e-Manifest data
require('dotenv').config()
const axios = require('axios');

const axiosGet = axios.create({
    baseURL: 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/',
    method: 'get'
});
const axiosAuth = axios.create({
    baseURL: 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/auth/',
    method: 'get'
});

axiosGet.interceptors.request.use(async function (config){
    const response = await axiosAuth({
        url: `./${process.env.RCRAINFO_API_ID}/${process.env.RCRAINFO_API_KEY}`
    })
    config.headers.Authorization = 'Bearer ' + response.data.token
    return config
},  function (error){
    console.log(error);
});

module.exports.get = axiosGet;

// Testing Area
// async function getSiteExistInt(siteID){
//     try{
//         const siteResTest = await axiosGet( {
//             url: `./site-exists/${siteID}`
//         })
//         console.log(siteResTest.data);
//         } 
//     catch (error) {
//         console.error(error);
//     }
// }

// const siteID  = 'VATEST000001';
// const siteDate = getSiteExistInt(siteID)
