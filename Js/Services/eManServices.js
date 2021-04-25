// e-Manifest Services
const eManAPI = require('./eManAPI');
const fs = require('fs');
const multipart = require('parse-multipart');

async function eManGet(mtn, attachments=0) {
    try{
        if (attachments){
            var res = await eManAPI.get({
                'url': `/emanifest/manifest/${mtn}/attachments`,
                responeType: 'multipart/form-data',
                headers:{
                    Accept: 'multipart/mixed'
                }
            })
            var boundIndex = res.headers['content-type'].indexOf('boundary=') + 'boundary='.length;
            var bound = res.headers['content-type'].slice(boundIndex, res.headers['content-type'].length);

            var parts = multipart.Parse(res.data,bound);
            for (let i=0; i<parts.length;i++){
                
            }

            // fs.writeFile('test.zip', res.data, function (err) {
            //     if (err) {
            //         return console.error(err);
            //     }
            // });
        }
        else {
            var res = await eManAPI.get({
                'url': `/emanifest/manifest/${mtn}`,
                'headers':{
                    'Accept': 'application/json'
                }
            })
        }
       console.log(bound);
    }
    catch (error){
        console.error(error);
    }
}

// Testing Area
const mtn = '100024721ELC';
const attachments = 1;
eManGet(mtn, attachments);
