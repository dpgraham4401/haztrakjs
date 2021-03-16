const axios = require('axios');
const fs = require('fs');

let baseUrl = 'https://www.metaweather.com/api/location/';

async function getID() {
    let response = await axios.get('https://www.metaweather.com/api/location/search/?query=dc');
    let data = response.data[0];
    return data.woeid
}

async function getWet() {
    let dcWoe = await getID();
    console.log("This data comes from MetaWeather.com's API");
    console.log('getting weather for DC (',dcWoe,')');

    let getWetUrl = baseUrl + dcWoe;
    //console.log(getWetUrl);

    let response = await axios.get(getWetUrl);
    let data = response.data.consolidated_weather[5];

    console.log("the current wind speed is: " + data.wind_speed + " mph");

    await fs.writeFile('auth.json',data)
    
}

getWet()
