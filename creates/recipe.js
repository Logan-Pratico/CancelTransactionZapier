// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'recipe',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'CancelTransaction',
  display: {
    label: 'CancelTransaction',
    description: 'POST call to cancel a transaction. Intended for use with back office transactions.'
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [
      {key: 'Authorization', required: true, type: 'string'},
      {key: 'User', required: true, type: 'string'},
      {key: 'Password', required: true, type: 'string'},
      {key: 'transactionId', required: true, type: 'string'},
    ],
    perform: (z, bundle) => {
      const promise = z.request({
        url: 'https://api.pverify.com/Test/API/CancelTransaction',
        method: 'POST',
        body: JSON.stringify({
          transactionId: bundle.inputData.transactionId,
        }),
        headers: {
	  'Authorization': bundle.inputData.Authorization,
	  'Client-User-Name': bundle.inputData.User,
	  'Client-Password': bundle.inputData.Password,
          'Content-Type': 'application/json',

          // This is NOT how you normally do authentication. This is just to demo how to write a create here.
          // Refer to this doc to set up authentication:
          // https://zapier.github.io/zapier-platform-cli/#authentication
          'X-API-Key': 'secret'
        }
      });

      return promise.then((response) => JSON.parse(response.content));
    },

  }
};
