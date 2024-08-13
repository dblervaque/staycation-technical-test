import camelCase from 'camelcase-keys';

import sql from '../db';


export const getHotels = async () => {
  const res = await sql`
    select *
    from hotels
  `;

  return res.map(camelCase);
}

export const getHotelReview = async (hotelId) => {
  const res = await sql`
    select hotel_id, user_id, score
    from reviews
    where hotel_id=${hotelId}
  `;

  const hotelReviews = res.map(camelCase);

  if (hotelReviews.length === 0) {
    return {
      avgScore: 0,
      reviewCount: 0,
    }
  }

  const avgScore = hotelReviews.reduce((acc, {
    score,
  }) => acc + score, 0) / hotelReviews.length;

  console.log(avgScore)

  return {
    avgScore,
    reviewCount: hotelReviews.length,
  }
}