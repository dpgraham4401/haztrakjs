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

axios.interceptors.request.use(res => {
    console.log('test 1');
    console.log('test 2');
    const tokenRes = axiosInt.get(`${baseUrl}auth/${process.env.RCRAINFO_API_ID}/${process.env.RCRAINFO_API_KEY}`);
    res.headers.Authorization = 'Bearer ' + tokenRes.data.token

    return res;
});

async function getSiteExistInt(siteID){
    const siteResTest = await axios( {
        method: 'get',
        url: `${baseUrl}site-exists/${siteID}`,
        
    })
}

// testing area
// const siteData = getSiteExist(siteID)
const siteDate = getSiteExistInt(siteID)