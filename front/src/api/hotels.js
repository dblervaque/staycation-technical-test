import fetch from 'isomorphic-fetch';

export const fetchHotels = async () => {
  const res = await fetch('http://localhost:9000/hotels');
  if (res.status >= 400) {
    throw new Error('There was an error');
  }
  return res.json();
};
