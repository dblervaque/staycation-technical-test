import postgres from "postgres";

const client = postgres({
  user: 'staycation',
  host: 'localhost',
  database: 'staycation',
  password: 'password',
  port: 5432
});

export default client;