// e-Manifest UI Link Serves

const eManAPI = require('./eManAPI');

async function mtnLink(page = 'View', siteID, mtn){
    page = page.charAt(0).toUpperCase() + page.slice(1).toLowerCase()
    mtn = mtn.toUpperCase();
    siteID = siteID.toUpperCase()
    try{
        const resUiLink = await eManAPI.post( {
            url: `./links/emanifest`,
            data: {
               "page": page,
               "epaSiteId": siteID,
               "manifestTrackingNumber": mtn
            }
        })
        console.log(resUiLink.data);
        } 
    catch (error) {
        console.error(error);
    }
}

async function dashLink(dash = 'Dashboard', siteID){
    //page = page.charAt(0).toUpperCase() + page.slice(1).toLowerCase()
    //mtn = mtn.toUpperCase();
    siteID = siteID.toUpperCase()
    try{
        const resUiLink = await eManAPI.post( {
            url: `./links/emanifest`,
            data: {
               "page": dash,
               "epaSiteId": siteID
            }
        })
        console.log(resUiLink.data);
        } 
    catch (error) {
        console.error(error);
    }
}

// Testing Area
const dash = 'Dashboard';
const siteID  = 'VATEST000001';
// const mtn = '100031335ELc';
const siteDate = dashLink(dash, siteID)
