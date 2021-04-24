// e-Manifest Services
const eManAPI = require('./eManAPI');
const fs = require('fs');

async function eManGet(mtn, attachments=0) {
    try{
        if (attachments){
            var res = await eManAPI.get({
                'url': `/emanifest/manifest/${mtn}/attachments`,
                'headers':{
                    'Accept': 'multipart/mixed'
                }
            })
        }
        else {
            var res = await eManAPI.get({
                'url': `/emanifest/manifest/${mtn}`,
                'headers':{
                    'Accept': 'application/json'
                }
            })
        }
       console.log(res);
    }
    catch (error){
        console.error(error);
    }
}

// Testing Area
const mtn = '100024721ELC';
const attachments = 1;
const test = eManGet(mtn, attachments);
