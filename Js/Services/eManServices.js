// e-Manifest Services
const eManAPI = require('./eManAPI');
async function eManGet(mtn) {
    try{
        const res = await eManAPI.get({
            url: `/emanifest/manifest/${mtn}`
        })
        console.log(res.data);
    }
    catch (error){
        console.error(error);
    }
}

// Testing Area
const mtn = '014059555JJK';
const test = eManGet(mtn);

// test
