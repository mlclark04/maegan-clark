export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = 'https://docs.google.com/spreadsheets/d/1iKeamsUBU8DIXbHgrNJQzurIqLSDbKV3c3s_mBXGysw/pub?output=csv';
  const response = await fetch(url);
  const csv = await response.text();
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 's-maxage=60',
    },
  });
}
