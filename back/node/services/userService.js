import camelCase from 'camelcase-keys'
import sql from '../db';

export const getUser = async (userId) => {
  
  const res = await sql`SELECT * FROM users WHERE id=${userId}`;
  console.log(res[0]);
  return camelCase(res[0])
}
