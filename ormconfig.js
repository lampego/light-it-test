const isTest = process.env.NODE_ENV === 'test';

module.exports = {
  name: 'default',
  type: 'mysql',
  port: 3306,
  host: process.env['DB_HOST'],
  username: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_DATABASE'],
  entities: [
    isTest
      ? __dirname + '/src/db/entities/*{.ts,.js}'
      : __dirname + '/dist/src/db/entities/*{.ts,.js}'
  ],
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['dist/src/db/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
