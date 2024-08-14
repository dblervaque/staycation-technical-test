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

  return {
    avgScore,
    reviewCount: hotelReviews.length,
  }
}

export const getHotelAvailability = async (hotelId) => {
  const hotelRooms = await sql`
    select id
    from rooms
    where hotel_id=${hotelId}
  `;

  if (!hotelRooms && hotelRooms.length) {
    // return 404 no hotel rooms found
  }

  console.log(hotelRooms)

  const roomOpenings = await sql`
    select *
    from openings
    where room_id in ${sql(hotelRooms.map(({ id }) => id))}
  `;

  const roomOpeningsCC = roomOpenings.map(camelCase);

  const bestRoom = roomOpeningsCC.sort(
    (a, b) => {
      return a.discountPrice - b.discountPrice;
    }
  );

  console.log(JSON.stringify(bestRoom[0]));

  return bestRoom[0];
}