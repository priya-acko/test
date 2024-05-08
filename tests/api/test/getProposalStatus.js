const urls = require('../endPoints/url');
const axios = require('axios');

 export async function getProposalStatus(proposalID) {
   
      let url = urls.proposalStatus+proposalID
        let responses= await axios.get(url);
       return responses.data.header.status;
        
   }
 
   
   