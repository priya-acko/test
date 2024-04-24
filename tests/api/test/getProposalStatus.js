const urls = require('../endPoints/url');
const axios = require('axios');

async function getProposalStatus(proposalID) {
   
      let url = urls.proposalStatus+proposalID
       let responses= await axios.get(url);
       console.log(responses.data.header.status);
      
      
   }
   getProposalStatus("b6ca6fd9-106f-4afb-ac6d-23547df5a2")
   
   module.exports = {getProposalStatus};