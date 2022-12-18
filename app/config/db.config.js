const config = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "12345678",
  DB_NAME: "express_auth_jwt",
  PORT: 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
export default config;
