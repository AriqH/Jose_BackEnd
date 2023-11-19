import { Sequelize } from "sequelize";

const db = new Sequelize('auth_vet', "root", '',{
    host: "localhost",
    dialect: "mysql",
    dialectModule : require("mysql2"),
})

export default db
