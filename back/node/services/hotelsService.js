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

  const roomOpenings = await sql`
    select *
    from openings
    where room_id in ${sql(hotelRooms.map(({ id }) => id))}
  `;
  const roomOpeningsCC = roomOpenings.map(camelCase);

  const roomBookings = await sql`
    select *
    from bookings
    where room_id in ${sql(hotelRooms.map(({ id}) => id))}
  `;
  const roomBookingsCC = roomBookings.map(camelCase);

  const sortedRoom = roomOpeningsCC.sort(
    (a, b) => {
      return a.discountPrice - b.discountPrice;
    }
  );

  let bestRoom;
  sortedRoom.forEach((room) => {
    const isRoomBooked = roomBookingsCC.findIndex(({ date }) => date === room.date);
    if (isRoomBooked === -1 && !bestRoom) {
      bestRoom = room;
    }
  });

  return bestRoom;
}