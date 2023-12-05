require("dotenv").config();
let logNum = 1;
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: Number(process.env.DB_PORT),
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    benchmark: process.env.DB_BENCHMARK ? true : false,
    logging: (message, benchmark) => {
      if (process.env.DB_LOGGING) {
        if (!benchmark) {
          return console.info(message);
        }
        console.info(
          `NUMBER:${logNum} ${message} Elapsed time: ${benchmark} ms`
        );
        logNum += 1;
      }
    },
    // logging: console.log,
    // logging: (a) => { console.log("\x1b[35m%s\x1b[0m", "[Sequelize]", a); }
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: (message, benchmark) => {
      if (process.env.DB_LOGGING) {
        if (!benchmark) {
          return console.info(message);
        }
        console.info(`${message} Elapsed time: ${benchmark} ms`);
      }
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    benchmark: process.env.DB_BENCHMARK ? true : false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: (message, benchmark) => {
      if (process.env.DB_LOGGING) {
        if (!benchmark) {
          return console.info(message);
        }
        console.info(`${message} Elapsed time: ${benchmark} ms`);
      }
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    benchmark: process.env.DB_BENCHMARK ? true : false,
  },
};
