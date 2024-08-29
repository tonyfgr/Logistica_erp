import { createPool } from "mysql2/promise";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./config.js";

export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE,
})
// import Sequelize from "sequelize";
// import { DB_DATABASE, DB_PASSWORD, DB_PORT, DB_USER } from "./config";

// const sequelize = new Sequelize(
//  DB_DATABASE,
//  DB_USER,
//  DB_PASSWORD,
//   {
//     host: DB_PORT,
//     dialect: 'mysql'
//   }
// );

// sequelize.authenticate().then(() => {
//    console.log('Connection has been established successfully.');
// }).catch((error) => {
//    console.error('Unable to connect to the database: ', error);
// });