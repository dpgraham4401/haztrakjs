const fetch = require('node-fetch');
const fs = require('fs');

let epaId   = 'VAD000532119';
let baseUrl = 'https://rcrainfopreprod.epa.gov/rcrainfo/rest/api/v1/auth/';
let apiId   = '9eb85033-05e4-45e1-9cbf-024140c3b047/';
let apiKey  = 'WBGKE2oB079TFEflY0y8';

let url = baseUrl + apiId + apiKey;
console.log(url)