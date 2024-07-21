// config/db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'mge_admin',
    host: 'localhost',
    database: 'marthas_good_eats',
    password: 'mge_pw',
    port: 5432,
});

module.exports = pool;