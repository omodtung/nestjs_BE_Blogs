import { DataSourceOptions, DataSource } from 'typeorm';

// eslint-disable-next-line prettier/prettier
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'blog-nestjs',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  // entities: ['dist/entities/**/*{.js,.ts}'],
  // migrations: ['dist/migrations/**/*{.js,.ts}'],
  synchronize: false,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
