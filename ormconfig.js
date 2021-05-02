module.exports = {
  name: 'default',
  type: 'mysql',
  port: 3306,
  host: process.env['DB_HOST'],
  username: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_DATABASE'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
