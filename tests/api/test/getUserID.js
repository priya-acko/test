const urls = require('../endPoints/url');
const axios = require('axios');

 async function getUserId(phoneNumber) {
 // appending Phone number in the URL
   let url = urls.entittyID+phoneNumber
    let response = await axios.get(url);
    return response.data.id
}

module.exports = { getUserId };

