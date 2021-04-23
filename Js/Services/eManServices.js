// e-Manifest Services
const eManAPI = require('./eManAPI');
async function eManGet(mtn, attachments=0) {
    try{
        const res = await eManAPI.get({
            if (attachments)
            'url': `/emanifest/manifest/${mtn}/attachments`,
           'headers':{
               'Accept': 'multipart/mixed'
            }
        })
        //console.log(res.data);
    }
    catch (error){
        console.error(error);
    }
}

// Testing Area
const mtn = '100024721ELC';
const test = eManGet(mtn);
