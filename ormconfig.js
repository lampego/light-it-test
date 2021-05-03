const isTest = process.env.NODE_ENV === 'test';

let host = isTest ? 'test-database' : process.env['DB_HOST'];
if (process.env['IS_AZURE_PIPELINES']) {
  host = '127.0.0.1';
}

module.exports = {
  name: 'default',
  type: 'mysql',
  port: 3306,
  host: host,
  username: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_DATABASE'],
  entities: [
    isTest
      ? __dirname + '/src/db/entities/*{.ts,.js}'
      : __dirname + '/dist/src/db/entities/*{.ts,.js}',
  ],
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['dist/src/db/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  logging: [
    // 'query',
    'error',
  ],
};
