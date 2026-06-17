const https = require('https');

function fetchWithRedirect(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchWithRedirect(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  try {
    const csv = await fetchWithRedirect('https://docs.google.com/spreadsheets/d/1iKeamsUBU8DIXbHgrNJQzurIqLSDbKV3c3s_mBXGysw/pub?output=csv');
    res.setHeader('Cache-Control', 's-maxage=60');
    res.status(200).send(csv);
  } catch (e) {
    res.status(500).send('Error: ' + e.message);
  }
}
