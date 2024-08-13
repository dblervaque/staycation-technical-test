import React, { useEffect, useState } from 'react'

import Header from './Header'
import HotelCard from './HotelCard/HotelCard.component';

import { fetchHotels } from '../api/hotels';

const App = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotels().then((res) => {
      if (res) {
        setHotels(res);
      }
    });
  }, [])

  return (
    <div className='app'>
      <Header />
      <div className='app__body'>
        {
          hotels.map((hotel) => (
            <HotelCard 
              name={hotel.name}
              pictureId={hotel.pictureId}
              stars={hotel.stars}
              preview={hotel.preview}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
