import React from 'react';

import 'styles/hotel.scss'

const StarBase = ({
  stars,
}) => {
  let index = 0;
  let result = '';
  while (index < stars) {
    result = `${result}\u066d`;
    index++;
  }
  return (<p className='hotel__card__stars'>{result}</p>);
}

const HotelCardBase = ({
  pictureId,
  name,
  stars,
  preview,
  avgScore,
  reviewCount,
}) => (
  <div className="hotel__card">
    <img src={pictureId} />
    <div className='hotel__card__top__line__container'>
      <div className="hotel__card__name__container">
        <p className='hotel__card__name'>{name}</p>
        <StarBase stars={stars} />
      </div>       
      <div className='hotel__card__score__container'>
        <p className='hotel__card__avg__score'>{avgScore+''}</p>
        <p className='hotel__card__total_reviews'>({reviewCount+''})</p>
      </div>
    </div>
    <p>{preview}</p>
  </div>
)

export default HotelCardBase;