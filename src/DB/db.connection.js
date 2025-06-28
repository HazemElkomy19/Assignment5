import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "assignment5",
  password: "hazem166",
  port: 5432,
});

export default client;






