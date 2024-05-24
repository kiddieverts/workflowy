const functions = require('firebase-functions');
const axios = require('axios');

exports.cron = functions.pubsub
  .schedule('every 15 minutes')
  .onRun(async () => {
    try {
      const response = await axios.post(
        functions.config().workflowy.run_endpoint,
        {}, // Empty data payload
        {
          headers: {
            'x-workflowy-hash': functions.config().workflowy.secret_hash
          }
        }
      );
      console.log('HTTP Request successful:', response.data);
    } catch (error) {
      console.error('HTTP Request failed:', error);
    }
    return null;
  });
