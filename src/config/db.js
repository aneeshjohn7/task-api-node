import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'mydb',
  password: 'secret', // change if needed
  port: 5432,
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