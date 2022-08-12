import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
  synchronize: JSON.parse(process.env.DB_SYNCHRONIZE),
  dropSchema: false,
  logging: false,
};

export default ormConfig
