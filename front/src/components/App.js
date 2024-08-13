import React, { useEffect, useState } from 'react'

import Header from './Header'
import { fetchHotels } from '../api/hotels';

const App = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    let hasBeenCalled = false;
    fetchHotels().then((res) => {
      if (res && !hasBeenCalled) {
        console.log(res);
        setHotels(res);
      }
    });

    return () => {
      hasBeenCalled = true;
    }
  }, [])

  return (
    <div className='app'>
      <Header />
      <div className='app__body'>
        <h1>Your code goes here.</h1>
      </div>
    </div>
  )
}

export default App
