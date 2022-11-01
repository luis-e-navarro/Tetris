const { Pool } = require('pg');

const PG_URI = 'postgres://pwfzspcz:g9QxKSuhO1T4KeuJpWoyPjdX37cIv2gD@jelani.db.elephantsql.com/pwfzspcz';

const pool = new Pool({
    connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
}