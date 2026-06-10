const path = require('path');
module.exports = ({ env }) => {
  if (env('DATABASE_URL')) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: { rejectUnauthorized: false },
        },
        pool: { min: 0, max: 5 },
      },
    };
  }
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
