import React, { useEffect, useState } from 'react'

import Header from './Header'
import HotelCard from './HotelCard/HotelCard.component';

import { fetchHotels } from '../api/hotels';
import { HotelCardContext, HotelCardContextProvider } from './HotelCard/HotelCard.context';

import 'styles/app.scss'

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
            <HotelCardContextProvider hotelId={hotel.id}>
              <HotelCardContext.Consumer>
                {({ avgScore, reviewCount }) => (
                  <HotelCard 
                    name={hotel.name}
                    pictureId={hotel.pictureId}
                    stars={hotel.stars}
                    preview={hotel.preview}
                    avgScore={avgScore}
                    reviewCount={reviewCount}
                  />
                )}
                
              </HotelCardContext.Consumer>
            </HotelCardContextProvider>
          ))
        }
      </div>
    </div>
  )
}

export default App
