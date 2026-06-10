const path = require('path');

module.exports = ({ env }) => {
  // DATABASE_URL varsa PostgreSQL kullan (Production - Render)
  if (env('DATABASE_URL')) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: {
            rejectUnauthorized: false,
          },
        },
        pool: {
          min: 0,
          max: 5,
        },
      },
    };
  }

  // DATABASE_URL yoksa SQLite kullan (Lokal geliştirme)
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };
};