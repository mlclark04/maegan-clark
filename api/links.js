export default async function handler(req, res) {
  const url = 'https://docs.google.com/spreadsheets/d/1iKeamsUBU8DIXbHgrNJQzurIqLSDbKV3c3s_mBXGysw/pub?output=csv';
  const response = await fetch(url);
  const csv = await response.text();
  res.setHeader('Cache-Control', 's-maxage=60');
  res.status(200).send(csv);
}
