import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

/*
docker run -d \
  --name my_postgres \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  postgres:latest
  */
 /* 

 docker exec -it my_postgres psql -U admin  -d mydb

 */