import express from 'express'
import cors from 'cors'

import { getUser } from './services/userService'
import { getHotelReview, getHotels } from './services/hotelsService'

const app = express()

app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/users/:id', async (req, res) => {
  const user = await getUser(req.params.id)
  res.send(user)
})

app.get('/hotels/', async (req, res) => {
  const hotels = await getHotels();
  res.send(hotels);
})

app.get('/hotels/:hotelId/reviews', async (req, res) => {
  const hotelId = req.params.hotelId;
  const {
    computeAverageScore = false,
  } = req.query;

  if (computeAverageScore) {
    const data = await getHotelReview(hotelId)
    res.send(data);
  } else {
    res.status(501);
  }
})

app.listen(9000, function () {
  console.log('Example app listening on port 9000!')
})
