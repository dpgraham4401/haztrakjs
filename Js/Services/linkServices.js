// e-Manifest UI Link Serves

const eManAPI = require('./eManAPI');

async function postUiLink(){
    try{
        const resUiLink = await eManAPI.post( {
            url: `./links/emanifest`,
            data: {
               "page": "View",
               "epaSiteId": "VATEST000001",
               "manifestTrackingNumber": "100031335ELC"
            }
        })
        console.log(resUiLink.data);
        } 
    catch (error) {
        console.error(error);
    }
}

const siteID  = 'VATEST000001';
const siteDate = postUiLink()