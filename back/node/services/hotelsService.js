import camelCase from 'camelcase-keys';

import sql from '../db';


export const getHotels = async () => {
  const res = await sql`
    select *
    from hotels
  `;

  return res.map(camelCase);
}