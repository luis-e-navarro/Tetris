const { Pool } = require('pg');

const PG_URI = 'postgres://hzuoijqb:rGEXPS9gXIKVxtMF3cWqP0iyq55l4wgm@jelani.db.elephantsql.com/hzuoijqb';

const pool = new Pool({
    connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
}