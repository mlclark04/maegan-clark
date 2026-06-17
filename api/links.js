export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQHvYHhjWVdIugqzZ4xyG5bOUadzz2m1A9Ca4PK0KRBxoDNQT8w6n7eg2jkS9Nu0u7g9SwZRNTUa74z/pub?output=csv';
  const response = await fetch(url);
  const csv = await response.text();
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 's-maxage=60',
    },
  });
}
