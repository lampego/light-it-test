module.exports = {
  type: 'mysql',
  host: process.env['DB_HOST'],
  port: 3306,
  username: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_DATABASE'],
  entities: ['dist/db/entities/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['src/db/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
