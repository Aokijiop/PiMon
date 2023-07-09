const { Pool } = require("pg");

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'pimon_char_info',
//     password: '1025',
//     port: 5432,
//   });

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// console.log(process.env.PGUSER);
// console.log(process.env.PGHOST);
// console.log(process.env.PGDATABASE);
// console.log(process.env.PGPASSWORD);
// console.log(process.env.PGPORT);

module.exports = {
    query: (text, params) => pool.query(text, params)
};