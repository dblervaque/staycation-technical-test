import fetch from 'isomorphic-fetch';

export const fetchHotels = async () => {
  const res = await fetch('http://localhost:9000/hotels');
  if (res.status >= 400) {
    throw new Error('There was an error');
  }
  return res.json();
};

export const fetchHotelReview = async (
  hotelId,
) => {
  const res = await fetch(`http://localhost:9000/hotels/${hotelId}/reviews?computeAverageScore=true`);
  if (res.status >= 400) {
    throw new Error('Error computing avg score');
  }
  return res.json();
}