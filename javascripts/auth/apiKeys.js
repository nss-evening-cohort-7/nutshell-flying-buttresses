const firebaseAPI = require('./firebaseAPI.js');
const {checkLoginStatus,} = require('./auth.js');

const apiKeys = () =>
{
  return new Promise((resolve, reject) =>
  {
    $.ajax('./db/apiKeys.json')
      .done((data) =>
      {
        resolve(data);
      })
      .fail((err) =>
      {
        reject(err);
      });
  });
};

const retrieveKeys = () =>
{
  apiKeys()
    .then((result) =>
    {
      firebaseAPI.setConfig(result.firebase);
      firebase.initializeApp(result.firebase);
      checkLoginStatus();
    }).catch((err) =>
    {
      console.error('No keys', err);
    });
};

module.exports =
{
  retrieveKeys,
};
