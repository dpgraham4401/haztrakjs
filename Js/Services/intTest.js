// Use the Preprod API to get RCRAInfo/e-Manifest data
const axios = require('axios');
const axiosInt = axios.create();

// Local modules
const auth = require('./auth');

const baseUrl = 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/';
const siteID  = 'VATEST000001';

async function getSiteExist(siteID){
    try{
        // const tokenResp = await auth.getToken();
        const siteResponse = await axios( {
            method: 'get',
            url: `${baseUrl}site-exists/${siteID}`,
            headers:{
                Authorization: 'Bearer ' + tokenResp.token
            }
    })
        // console.log(siteResponse.data);
        return await siteResponse.data;
    }
    catch (error) {
        console.error(error);
    }
}

// axios.interceptors.response.use(response => {
//     const response = axiosInt.get(`${baseUrl}auth/${process.env.RCRAINFO_API_ID}/${process.env.RCRAINFO_API_KEY}`);

//     return response;
// });

axios.interceptors.request.use(async function (config){
    
    const response = await axiosInt.get(`${baseUrl}auth/${process.env.RCRAINFO_API_ID}/${process.env.RCRAINFO_API_KEY}`);
    // console.log(response.data.token)
    config.headers.Authorization = 'Bearer ' + response.data.token
    return config
}, function (error){
    console.log(error);
});

async function getSiteExistInt(siteID){
    const siteResTest = await axios( {
        method: 'get',
        url: `${baseUrl}site-exists/${siteID}`
    })
    console.log(siteResTest.data);
}

// testing area
// const siteData = getSiteExist(siteID)
const siteDate = getSiteExistInt(siteID)