
const urls = require('../endPoints/url');
const payloads = require('../payload/dataEntry');
const axios = require('axios');
const userId = require('./getUserID')

 export async function createDataForLife(phoneNumber) {
    // modifying payload for number
    let numericUserID  =  await userId.getUserId(phoneNumber);
    payloads.id =numericUserID 
    payloads.phoneNumber =phoneNumber
     let response = await axios.post(urls.createTestEntryV3,payloads);
     console.log(response.data);
}





