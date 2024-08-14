import React, { createContext, useEffect, useState } from 'react';
import { fetchHotelOpenings, fetchHotelReview } from '../../api/hotels';

export const HotelCardContext = createContext({
  avgScore: 0,
  reviewCount: 0,
  opening: undefined,
});

export const HotelCardContextProvider = ({
  children,
  hotelId,
}) => {
  const [avgScore, setAvgScore] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [opening, setOpening] = useState(undefined);

  useEffect(() => {
    if (!hotelId) {
      return;
    }
    fetchHotelReview(hotelId)
      .then((data) => {
        setAvgScore(data.avgScore.toFixed(1));
        setReviewCount(data.reviewCount);
      })
      .catch((err) => console.error(err));
    fetchHotelOpenings(hotelId)
      .then((data) => {
        console.log(data);
        setOpening(data);
      })
      .catch((err) => console.error(err));
  }, [hotelId]);

  return (
    <HotelCardContext.Provider value={{
      avgScore,
      reviewCount,
      opening,
    }}
    >
      {children}
    </HotelCardContext.Provider>
  )
}